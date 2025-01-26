"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchProducts from "../SearchProducts";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-cream items-center shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href='/'>
        <div className="text-[25px] font-bold">Interior</div>
        </Link>

        <nav className="hidden md:flex text-black font-normal space-x-8">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-700">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-gray-700">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-700">
            Contact
          </Link>
          <Link href="/product" className="hover:text-gray-700">
            Product
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard" aria-label="User Icon">
            <Image
              src="/icons/profile1.png"
              alt="User Icon"
              width={20}
              height={20}
              className="hover:opacity-75"
            />
          </Link>
          {/* <Link href={SearchProducts()} aria-label="User Icon">
              <Image
                src="/icons/search.png"
                alt="Serach Icon"
                width={20}
                height={20}
                className="hover:opacity-75 cursor-pointer"
              />
            </Link> */}
            <div
              onClick={() => setIsSearchOpen(true)} // Open modal when icon is clicked
              style={{ display: 'inline-block', cursor: 'pointer' }}
            >
              <Image
                src="/icons/search.png"
                alt="Search Icon"
                width={20}
                height={20}
                className="hover:opacity-75"
              />
            </div>
            <SearchProducts
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)} // Close modal on click
            />

          <Link href="/wishlist" aria-label="Wishlist Icon">
            <Image
              src="/icons/wishlist1.png"
              alt="Heart Icon"
              width={20}
              height={20}
              className="hover:opacity-75 cursor-pointer"
            />
          </Link>
          <Link href="/cart" aria-label="Cart Icon">
            <Image
              src="/icons/cart1.png"
              alt="Cart Icon"
              width={20}
              height={20}
              className="hover:opacity-75 cursor-pointer"
            />
          </Link>
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-yellow-100">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <Link href="/shop" className="hover:text-gray-700">
              Shop
            </Link>
            <Link href="/blog" className="hover:text-gray-700">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-700">
              Contact
            </Link>
            <Link href="/cart" className="hover:text-gray-700">
              cart
            </Link>
          </nav>

          <div className="flex justify-around p-4 border-t">
            <Link href="/dashboard" aria-label="User Icon">
              <Image
                src="/icons/profile1.png"
                alt="User Icon"
                width={24}
                height={24}
                className="hover:opacity-75 cursor-pointer"
              />
            </Link>
            <div
              onClick={() => setIsSearchOpen(true)} // Open modal when icon is clicked
              style={{ display: 'inline-block', cursor: 'pointer' }}
            >
              <Image
                src="/icons/search.png"
                alt="Search Icon"
                width={20}
                height={20}
                className="hover:opacity-75"
              />
            </div>
            <SearchProducts
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)} // Close modal on click
            />
            <Link href="/wishlist" aria-label="Wishlist Icon">
              <Image
                src="/icons/wishlist1.png"
                alt="Heart Icon"
                width={24}
                height={24}
                className="hover:opacity-75 cursor-pointer"
              />
            </Link>
            <Link href="/cart" aria-label="Cart Icon">
              <Image
                src="/icons/cart1.png"
                alt="Cart Icon"
                width={24}
                height={24}
                className="hover:opacity-75 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;