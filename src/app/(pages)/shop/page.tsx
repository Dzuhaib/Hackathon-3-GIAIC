'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import client from '@/app/sanityClient';
import Product from '@/app/components/interface/product';
import Link from 'next/link';

const PRODUCTS_PER_PAGE = 12;

// Function to fetch all products
async function fetchAllProducts(): Promise<Product[]> {
  const query = `
    *[_type == "product"] | order(_createdAt desc) {
      id,
      name,
      imagePath,
      price,
      description,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category
    }
  `;
  return await client.fetch(query);
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
  const [filterCriteria, setFilterCriteria] = useState<string>('all'); // Filter criteria

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all products
        const allProducts = await fetchAllProducts();

        // Remove duplicates based on 'id'
        const uniqueProducts = allProducts.filter(
          (product, index, array) =>
            index === array.findIndex((p) => p.id === product.id)
        );

        setProducts(uniqueProducts);
        setTotalProducts(uniqueProducts.length);
        setDisplayedProducts(
          uniqueProducts.slice(0, PRODUCTS_PER_PAGE) // Initial products for page 1
        );
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filterCriteria, products, currentPage]);

  const applyFilter = () => {
    // Filter logic
    const filteredProducts =
      filterCriteria === 'all'
        ? products
        : products.filter((product) =>
            filterCriteria === 'discount'
              ? product.discountPercentage > 0
              : product.category === filterCriteria
          );

    setTotalProducts(filteredProducts.length);

    // Paginate filtered products
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  };

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url('/images/shopbg.png')] bg-cover">
        <Image src="/icons/shop1.png" height={70} width={70} alt="" />
        <h1 className="text-[48px] font-semibold">Shop</h1>
        <p>
          <Link href={'/'}>
            <span className="font-semibold">Home</span>
          </Link>
        </p>
      </div>

      {/* Toolbar Section */}
      <div className="flex justify-between items-center h-[70px] px-4 lg:px-10 bg-cream2">
        <div className="flex-row gap-3 h-[50px] flex items-center">
          {/* Filter Dropdown */}
          <select
            className="border rounded px-2 py-1"
            onChange={(e) => setFilterCriteria(e.target.value)}
            value={filterCriteria}
          >
            <option value="all">All Products</option>
            <option value="discount">Discounted Products</option>
            {/* Add more categories as needed */}
          </select>

          {/* View Toggle */}
          <button onClick={() => setIsGridView(true)}>
            <Image
              src="/icons/four.png"
              width={18}
              height={18}
              alt="Grid View"
              className={`${isGridView ? 'opacity-100' : 'opacity-50'}`}
            />
          </button>
          <button onClick={() => setIsGridView(false)}>
            <Image
              src="/icons/view.png"
              width={18}
              height={18}
              alt="List View"
              className={`${!isGridView ? 'opacity-100' : 'opacity-50'}`}
            />
          </button>

          <span className="mx-2">|</span>
          <p>
            Showing {displayedProducts.length} of {totalProducts} results
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      {loading ? (
        <div className="text-center py-10">Loading products...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <>
          {/* Products */}
          <div
            className={`grid ${
              isGridView
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'grid-cols-1 gap-4'
            } py-2 px-4 lg:px-10`}
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 border rounded-lg shadow-lg flex flex-col"
              >
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className={`${
                    isGridView ? 'w-full h-64' : 'w-32 h-32'
                  } object-cover mb-4 rounded`}
                />
                <div className="flex flex-col flex-1">
                  <Link href={`/shop/${product.id}`}>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                  </Link>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-xl font-bold mt-4">${product.price}</p>
                  {product.discountPercentage > 0 && (
                    <p className="text-red-500 mt-2">
                      Discount: {product.discountPercentage}%
                    </p>
                  )}
                  <Link href={`/shop/${product.id}`}>
                    <button className="w-full mt-4 bg-cream text-black py-2 px-4 rounded-md hover:bg-cream3 transition duration-300">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 py-10 px-10">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`${
                  currentPage === index + 1
                    ? 'bg-cream3'
                    : 'bg-cream2 hover:bg-cream3'
                } rounded-md py-3 px-4`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
