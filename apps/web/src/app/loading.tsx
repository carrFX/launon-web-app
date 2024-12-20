import { RiTShirtAirLine } from "react-icons/ri";

const Loading = () => {
  return (
    <section className="min-h-screen z-50 bg-beigeCustom w-full flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-4 text-black ">
        <RiTShirtAirLine className="text-6xl md:text-8xl lg:text-9xl " />
        <p className="text-4xl font-semibold md:text-5xl md:font-bold lg:text-6xl lg:font-extrabold">
          LaunON.
        </p>
      </div>
      <span className="loading loading-ring mt-4 text-grayCustom w-32" style={{ fontSize: '5rem' }}></span>
    </section>
  );
};

export default Loading;