import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const title = " > My Account";
  return (
    <div>
      <div className='flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url("/images/shopbg.png")] bg-cover'>
        <Image src="/icons/shop1.png" height={70} width={70} alt="" />
        <h1 className="text-[48px] font-semibold">My Account</h1>
        <p>
          <span className="font-semibold">Home</span>
          {title}
        </p>
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
};

export default page;
