import PickupRequest from "@/components/(services)/PickupRequest"

const page = () => {
  return (
    <section className="text-black px-2 bg-lightCustom w-full min-h-screen flex flex-col justify-center items-center md:py-10">
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mt-0 text-center w-full">Services at LaunON.</h1>
      <p className="text-medium md:text-lg pb-4 text-center">Nikmati kemudahan layanan profesional dari LaunON! Kami hadir untuk memastikan pakaian Anda selalu rapi tanpa kusut.</p>
      <PickupRequest/>
    </section>
  )
}

export default page