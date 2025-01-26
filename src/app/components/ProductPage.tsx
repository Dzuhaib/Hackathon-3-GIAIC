'use client'; // Make sure this is included to mark it as a client-side component

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../(pages)/context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const { addToCart } = useCart(); // Access addToCart from the context

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [showPopup, setShowPopup] = useState(false); // Popup state for "Added to Cart"
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchProductData = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`); // Replace with your actual API endpoint
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        name: product.name,
        price: product.price,
        quantity,
        image: product.image.url,
        slug: product.slug,
      };
      addToCart(itemToAdd); // Add item to the cart
      setShowPopup(true); // Show success popup
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found. Please check the URL or try again later.</div>;
  }

  return (
    <div className="product-page">
      <div className="product-info">
        <Image src={product.image.url} alt={product.name} width={500} height={500} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>

        <div className="quantity-selector">
          <button onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Item added to cart!</p>
          <Link href="/cart">
            <button>Go to Cart</button>
          </Link>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
