import OutletLocation from '@/components/(outlets)/OutletList';

const page = () => {
  return (
    <section className="bg-beigeCustom w-full min-h-screen flex flex-col justify-start items-center md:py-10 text-black">
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mt-0 text-center w-full">
        Outlets Locations
      </h1>
      <p className="text-black text-medium md:text-lg mb-2 md:mb-4 text-center">
        Lokasi outlet kami yang tersebar di seluruh Indonesia, siap melayani
        kebutuhan laundry Anda dengan cepat dan mudah.
      </p>
      <OutletLocation />
    </section>
  );
};

export default page;
