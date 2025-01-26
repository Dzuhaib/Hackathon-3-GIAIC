import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Section4 = () => {
  return (
    <div className="bg-cream3 px-4 lg:px-20 py-10 lg:py-20 flex flex-col lg:flex-row items-center justify-evenly">
      <div className="flex-1 mb-8 lg:mb-0">
        <Image 
          src='/images/asgaarda.png' 
          alt="Asgaard Sofa" 
          width={800} 
          height={400} 
          className="w-full h-auto" // Make the image responsive
        />
      </div>
      <div className="flex-1 text-center">
        <h3 className="text-[20px] lg:text-[24px] font-light">New Arrivals</h3>
        <h1 className="font-bold text-[36px] lg:text-[50px]">Asgaard Sofa</h1>
        <Link href='/shop'>
        <button className="bg-transparent text-black border-[1px] mt-8 px-8 lg:px-14 py-3 border-black">
          Shop now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Section4;