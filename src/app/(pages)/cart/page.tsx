'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link'; // Import Link from Next.js

// Define the structure of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

// Define the structure of the cart state
interface CartState {
  items: CartItem[];
}

// Define the structure of the action for the cart reducer
interface CartAction {
  type: string;
  payload: any; // You can define a more specific type based on your actions
}

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        const items: CartItem[] = JSON.parse(savedCartItems);
        setCartItems(items);
        items.forEach((item) => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      }
    }
  }, [dispatch]);

  // Save cart items to localStorage whenever the state changes
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  }, [state.items]);

  const title = ' > Cart';

  return (
    <>
      <div className='flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url("/images/shopbg.png")] bg-cover'>
        <img src="/icons/shop1.png" height={70} width={70} alt="Logo" />
        <h1 className="text-[48px] font-semibold">Cart Page</h1>
        <p>
          <span className="font-semibold"><Link href='/'>Home</Link></span>
          {title}
        </p>
      </div>
      <div className="py-10 px-4 lg:px-20 bg-gray-100 min-h-screen">
        {/* Cart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-lg">
            <div className="hidden lg:grid grid-cols-4 gap-4 mb-6 text-gray-600 font-medium">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {state.items.length === 0 ? (
              <p className="text-lg text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 lg:grid-cols-4 items-center gap-4">
                    {/* Product Info */}
                    <div className="flex items-center">
                      <img
                        src={item.imagePath}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-gray-600 lg:text-center">
                      $ {item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, Number(e.target.value))
                        }
                        min="1"
                        className="border rounded px-2 py-1 w-16 text-center"
                      />
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between lg:justify-center items-center">
                      <span className="text-gray-600 font-medium">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition ml-4"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Totals */}
          <div className="bg-yellow-100 p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-medium">
                $ {state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total</span>
              <span className="text-red-500 font-bold text-xl">
                $ {state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            <Link href="/checkout">
              <button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition"
              >
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;