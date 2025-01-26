import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@sanity/client';
import Image from 'next/image';
import Link from 'next/link';
import client from '../sanityClient';
import Product from './interface/product';

interface SearchProductsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Fetch products from Sanity CMS
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const query = `
          *[_type == "product" && name match "${searchTerm}*"] {
            id,
            name,
            imagePath,
            price,
            description,
            "image": image.asset->url
          }
        `;
        const fetchedProducts = await client.fetch(query);

        // Remove duplicates based on product id
        const uniqueProducts = Array.from(
          new Map(fetchedProducts.map((product: { id: any; }) => [product.id, product])).values()
        );
        setProducts(uniqueProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-11/12 max-w-4xl p-5 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">
          ❌
        </button>

        {/* Search Bar */}
        <h2 className="text-xl mb-4">Search Products</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />

        {/* Loading Indicator */}
        {loading && <p>Searching...</p>}

        {/* Search Results */}
        {!loading && products.length > 0 && (
          <ul className="space-y-4">
            {currentProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-md">
                {/* Product Image */}
                <div className="mr-4">
                  <Link href={`/shop/${product.id}`}>
                    <Image
                      src={product.imagePath}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
                </div>

                {/* Add to Cart Button */}
                <button onClick={() => console.log(`Add ${product.name} to cart`)} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* No Results Message */}
        {!loading && products.length === 0 && searchTerm && <p>No products found.</p>}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * productsPerPage >= products.length}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
