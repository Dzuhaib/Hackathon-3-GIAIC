import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Section1 = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-20 py-10 justify-between bg-cream2">
      <div className="flex-1 mb-8 lg:mb-0 text-center">
        <Image 
          src='/images/side1.png' 
          height={900} 
          width={900} 
          alt="Side Table" 
          className="w-full h-auto" // Make the image responsive
        />
        <h2 className="text-[24px] lg:text-[30px] font-semibold">Side Table</h2>
        <Link href='/shop'>
        <button className="bg-transparent text-black mt-4 border-b-2 pb-2 text-[18px] lg:text-[20px] border-b-black">
          Shop now
        </button>
        </Link>
      </div>
      <div className="flex-1 text-center">
        <Image 
          src='/images/side2.png' 
          height={900} 
          width={900} 
          alt="Side Table" 
          className="w-full h-auto" // Make the image responsive
        />
        <h2 className="text-[24px] lg:text-[30px] font-semibold">Side Table</h2>
        <Link href='/shop'>
        <button className="bg-transparent text-black mt-4 border-b-2 pb-2 text-[18px] lg:text-[20px] border-b-black">
          Shop now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Section1;