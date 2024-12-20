"use client";
import Slider from 'react-slick';
import data from '@/data/dummy.json';
import Image from 'next/image';

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <section className="w-full flex flex-col justify-center items-center bg-lightCustom md:py-10">
      <div className="text-center mt-3 md:mt-10 px-5 md:px-0">
          <h1 className="text-xl md:text-4xl font-semibold uppercase tracking-wide text-black mt-12 md:mt-0">What Our Customer Say?</h1>
          <p className='text-sm md:text-base'>Lihat bagaimana pelanggan LaunKlin mengambil pilihan yang tepat dan mendapatkan hasil yang luar biasa.</p>
        </div>

      <div className="w-full max-w-2xl mx-auto">
        <Slider {...settings}>
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-beigeCustom rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover object-center"
                    width={150}
                    height={150}
                  />
                </div>
                <h2 className="text-black uppercase tracking-wider font-bold">{testimonial.name}</h2>
                <p className="text-black mt-2 tracking-wide">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
