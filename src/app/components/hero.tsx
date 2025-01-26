import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-cream px-4 lg:px-20 py-10">
      <div className="flex-1 text-center lg:text-left lg:ml-10 mb-8 lg:mb-0">
        <h1 className="text-[28px] lg:text-[40px] font-bold max-w-screen-sm">
          Rocket Single Seater
        </h1>
        <Link href={'/shop'}>
          <button className="bg-transparent sm:pb-8 mt-4 border-b-2 pb-2 text-[16px] lg:text-[18px] text-black border-b-black">
            Shop now
          </button>
        </Link>
      </div>
      <div className="flex-1 mt-8 lg:mt-0 w-full lg:w-1/2">
        <Image 
          src='/images/rocket.png' 
          alt="single seater" 
          width={1500} 
          height={1500} 
          className="w-full h-auto" // Make the image responsive
        />
      </div>
    </div>
  );
};

export default Hero;