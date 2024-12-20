import data from '@/data/dummy.json';
import Image from 'next/image';
import Link from 'next/link';
const CardServices = () => {
  return (
    <section className="w-full bg-lightCustom px-4 py-6">
      <div className="flex flex-wrap justify-evenly items-center">
        {data.cardServices.map((item, index) => {
          return (
            <Link
              href={item.route}
              key={index}
              className="flex flex-col justify-center items-center mx-2 my-3 hover:scale-90 duration-300 cursor-pointer"
            >
              <div className="w-full max-w-[350px] h-auto bg-cover rounded-xl mb-1 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.services}
                  className="object-cover"
                  width={350}
                  height={200}
                  priority
                />
              </div>
              <h1 className="w-full bg-black rounded-lg py-2 text-center text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-beigeCustom">
                {item.services}
              </h1>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CardServices;
