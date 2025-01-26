"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import client from '@/app/sanityClient';
import Product from './interface/product';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `
        *[_type == "product"][0...4] {
          id,
          name,
          imagePath,
          price,
          discountPercentage
        }
      `;
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/shop/${product.id}`} passHref>
              <div className="relative w-full h-48">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-lg font-bold">
              <Link href={`/shop/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-gray-600 mt-2">
              Price: ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-red-500 mt-1">
                Discount: {product.discountPercentage}%
              </p>
            )}
            <Link
              href={`/shop/${product.id}`}
              className="mt-4 block bg-cream text-black py-2 px-4 rounded-md text-center hover:bg-cream3 transition duration-300"
            >
              Add to cart
            </Link>
          </div>
        ))}
      </div>
      <div className="font-bold text-center items-center pt-6 ">
        <Link className='border-b-2 border-black' href={'/shop'}>View more</Link>
      </div>
        
    </section>
  );
};

export default HomePage;
