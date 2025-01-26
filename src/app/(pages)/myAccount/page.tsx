import React from "react";
import Link from "next/link";
import Image from "next/image";

function MyAccount() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-16 text-center">
            {/* Logo */}
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/minilogo.png"
                alt="Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-gray-900">My Account</h1>

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mt-2 flex items-center justify-center space-x-2">
              <span>
                <Link href="/">Home</Link>
              </span>
              <span> &gt; </span>
              <span>
                <Link href="/myAccount">My Account</Link>
              </span>
            </p>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroShop.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="pointer-events-none opacity-30"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold my-4">Log In</h2>
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="mb-2 text-gray-700">Username or email address</label>
              <input
                type="text"
                id="username"
                className="border border-gray-400 rounded p-2"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-2 text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="border border-gray-400 rounded p-2"
              />
            </div>
            <button className="px-10 py-3 bg-black text-white rounded-xl hover:bg-gray-700">Log In</button>
            <p className="mt-4 text-gray-500 text-sm hover:underline cursor-pointer">
              Lost Your Password?
            </p>
          </div>

          {/* Register Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold my-4">Register</h2>
            <div className="flex flex-col mb-4">
              <label htmlFor="register-email" className="mb-2 text-gray-700">Email address</label>
              <input
                type="text"
                id="register-email"
                className="border border-gray-400 rounded p-2"
              />
            </div>
            <p className="text-gray-500 mb-4">
              A link to set a new password will be sent to your email address.
            </p>
            <p className="text-gray-500 mb-4">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
              <span className="font-bold text-gray-700">privacy policy</span>.
            </p>
            <button className="px-10 py-3 bg-black text-white rounded-xl hover:bg-gray-700">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;