import { MdErrorOutline } from "react-icons/md";
const page = () => {
  return (
    <section className="min-h-screen bg-beigeCustom w-full flex flex-col justify-center items-center">
      <MdErrorOutline className="w-24 h-24 md:w-36 md:h-36 text-black" />
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mb-0 mt-2 md:mb-3 md:mt-5">Payment Unfinished</h1>
    </section>
  )
}

export default page