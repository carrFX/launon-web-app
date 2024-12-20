"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import carousel from '@/data/dummy.json';
import Link from 'next/link';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.carousel.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] overflow-hidden flex justify-center items-center">
      {/* Images */}
      <div className="flex transition-transform duration-700 ease-in-out" 
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {carousel.carousel.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-full relative">
            <Image
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] object-cover object-center"
              width={1200}
              height={600}
              priority
            />
            {/* Dark bg */}
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>
        ))}
      </div>

      {/* Content Carousel */}
      <div className="w-full px-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Clean Is <span className='text-beigeCustom'>ON.</span> With Laun<span className='text-beigeCustom'>ON.</span>
        </h1>
        <p className="mt-4 text-sm md:text-lg">
          Nikmati layanan laundry yang cepat, bersih, dan terpercaya di LaunON.
        </p>
        <button className="mt-11 hover:bg-black hover:text-beigeCustom bg-beigeCustom text-black py-2 px-4 rounded-full transition duration-200 shadow-2xl shadow-black">
          <Link href={'/services'}>Order Now</Link>
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {carousel.carousel.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Carousel;