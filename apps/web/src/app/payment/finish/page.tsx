import { IoMdTime } from "react-icons/io";
const page = () => {
  return (
    <section className="min-h-screen bg-beigeCustom w-full flex flex-col justify-center items-center">
      <IoMdTime className="w-24 h-24 md:w-36 md:h-36 text-black" />
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mt-2 mb-0 md:mb-3 md:mt-5">Your payment is being processed</h1>
    </section>
  )
}

export default page
