// src/pages/order-confirmation.tsx
'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import sanityClient from '@/app/sanityClient';

const OrderConfirmation: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const orderId = localStorage.getItem('orderId'); // Retrieve order ID from localStorage

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const query = `*[_type == "order" && orderId == "${orderId}"]{
        userDetails {
          firstName,
          lastName,
          email,
          phone
        },
        items[]{
          product->{
            id,
            name,
            price
          },
          quantity
        },
        totalAmount,
        status
      }`;

      const data = await sanityClient.fetch(query);
      setOrderDetails(data[0]); // Assuming the order ID is unique and returns a single order
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!orderDetails) {
    return <div className="text-center py-10">Order not found.</div>;
  }

  return (
    <div className="py-10 px-4 lg:px-20 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Thank You for Your Order!</h1>
      <p className="text-center text-lg mb-6">Your order ID is: <strong>{orderId}</strong></p>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium">User  Details:</h3>
          <p><strong>Name:</strong> {orderDetails.userDetails.firstName} {orderDetails.userDetails.lastName}</p>
          <p><strong>Email:</strong> {orderDetails.userDetails.email}</p>
          <p><strong>Phone:</strong> {orderDetails.userDetails.phone}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Items:</h3>
          <ul className="list-disc list-inside">
            {orderDetails.items.map((item: any, index: number) => (
              <li key={index}>
                {item.product?.name} - ${item.product?.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Total Amount:</h3>
          <p className="text-xl font-bold">${orderDetails.totalAmount.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Order Status:</h3>
          <p>{orderDetails.status}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;