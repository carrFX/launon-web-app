import Image from 'next/image';
import aboutImg from '@/data/dummy.json';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <section className="w-full flex flex-col py-10 justify-center items-center bg-lightCustom">
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mb-3 md:mt-0">
        About Us
      </h1>
      <div className="px-7 py-9 rounded-lg flex lg:flex-row flex-col-reverse items-center justify-between">
        <div className="lg:w-1/2 my-2 lg:text-right text-center lg:pr-6">
          <div>
            <h2 className="text-xl font-bold">Best Online Laundry Solution</h2>
            <p className="text-black text-medium md:text-lg mb-11">
              LaunON. adalah platform laundry online yang menghadirkan kemudahan
              dan efisiensi bagi pelanggan dalam mengurus kebutuhan cucian.
              Dengan fitur unggulan seperti penjadwalan penjemputan, pelacakan
              secara real-time, dan metode pembayaran yang aman, Kami memastikan
              pengalaman laundry yang cepat, praktis, dan dapat diandalkan.
              Layanan kami mencakup cuci, setrika, dry cleaning, hingga lipat,
              yang semuanya ditangani oleh tim ahli di berbagai stasiun
              pengolahan khusus.{' '}
            </p>
          </div>
          <Link
            href={'/about'}
            className="text-lightCustom hover:bg-black hover:text-white duration-300 bg-grayCustom px-3 py-2 rounded-full"
          >
            Read More
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="rounded-full overflow-hidden">
            <Image
              src={aboutImg.about[0]}
              alt="about-launON."
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
