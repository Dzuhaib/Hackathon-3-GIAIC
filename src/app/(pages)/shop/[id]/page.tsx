// src/pages/product.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import client from '@/app/sanityClient';
import Product from '@/app/components/interface/product';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const fetchProductById = async (id: string): Promise<Product> => {
  const query = `*[_type == "product" && id == $id][0] {
    id,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    stockLevel,
    category
  }`;
  
  return await client.fetch(query, { id });
};

const ProductPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart(); // Access the cart context
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const fetchedProduct = await fetchProductById(id as string);
          setProduct(fetchedProduct);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity, 
          imagePath: product.imagePath 
        },
      });
      alert(`${product.name} has been added to your cart!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const isAlreadyInWishlist = wishlist.some((wishItem: { id: string; }) => wishItem.id === product.id);

      if (!isAlreadyInWishlist) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.name} has been added to your wishlist!`);
      } else {
        alert(`${product.name} is already in your wishlist.`);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const title = ' > ' + product.name;

  return (
    <>
      <div className='flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url("/images/shopbg.png")] bg-cover'>
        <Image src="/icons/shop1.png" height={70} width={70} alt="" />
        <h1 className="text-[48px] font-semibold">Product</h1>
        <p>
          <span className="font-semibold"><Link href='/'>Home</Link></span>
          {title}
        </p>
      </div>

      <div className="py-10 px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image
              src={product.imagePath}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 lg:ml-10">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-red-500 mt-2">
                Discount: {product.discountPercentage}%
              </p>
            )}
            <p className="mt-4">{product.description}</p>

            {/* Quantity Selection */}
            <div className="mt-4">
              <label htmlFor="quantity" className="mr-2">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="border rounded px-2 py-1 w-16"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 bg-cream text-black py-2 px-4 rounded-md hover:bg-cream3 transition duration-300"
            >
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              ♥ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;