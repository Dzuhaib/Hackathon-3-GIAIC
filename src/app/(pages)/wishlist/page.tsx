// src/pages/wishlist.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(storedWishlist);
    }
  }, []);

  const handleRemoveFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div className="py-10 px-4 lg:px-20 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <ul className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          {wishlist.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <span>{item.name}</span>
              <span className="cursor-pointer text-red-500" onClick={() => handleRemoveFromWishlist(item.id)}>
                Remove
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;