// src/pages/checkout.tsx
'use client';

import React, { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import client from "@/app/sanityClient"; // Import your Sanity client
import Link from 'next/link'; // Import Link for redirection
import Image from "next/image"; // Import Image for Next.js

const CheckoutPage: React.FC = () => {
  const { state } = useCart(); // Access the cart state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    additionalInfo: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    const orderData = {
      orderId: Date.now().toString(),
      userDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      items: state.items,
      totalAmount: state.items.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0),
      status: 'pending',
    };

    // Save order to Sanity
    await saveOrder(orderData);

    // Store order ID in localStorage for confirmation page
    localStorage.setItem('orderId', orderData.orderId);

    // Redirect to the order confirmation page
    window.location.href = '/order-confirmation';
  };

  const saveOrder = async (orderData: { orderId: string; userDetails: any; items: any; totalAmount: number; status: string; }) => {
    try {
      const result = await client.create({
        _type: 'order',
        orderId: orderData.orderId,
        userDetails: orderData.userDetails,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
      });
      console.log('Order saved:', result);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div>
      <div className='flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url("/images/shopbg.png")] bg-cover'>
        <Image src="/icons/shop1.png" height={70} width={70} alt="" />
        <h1 className="text-[48px] font-semibold">Checkout</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start p-8 bg-white min-h-screen">
        <div className="w-full md:w-[60%]">
          <h1 className="text-2xl font-bold mb-6">Billing details</h1>
          <form className="space-y-6" onSubmit={handlePlaceOrder}>
            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Country"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Address"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="City"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                  Province/State
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Province/State"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Zip Code"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Information (Optional)
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Additional Information"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cash" className="mr-4">Cash on Delivery</label>

                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="bank">Direct Bank Transfer</label>
              </div>
            </div>

            <button type="submit" className="w-full mt-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              Place order
            </button>
          </form>
        </div>

        <div className="w-full md:w-[35%] mt-10 md:mt-0">
          <div className="p-6 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold mb-6">Products</h2>
            {state.items.length === 0 ? (
              <p className="text-gray-500">No products in the cart.</p>
            ) : (
              state.items.map((item: { id: React.Key | null | undefined; name: string; price: number; quantity: number; }) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <p>{item.name} (x{item.quantity})</p>
                  <p>$ {item.price.toFixed(2)}</p>
                </div>
              ))
            )}
            <div className="flex justify-between items-center mb-4 border-t pt-4">
              <p>Total</p>
              <p className="text-xl font-bold">
                $ {state.items.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default CheckoutPage;