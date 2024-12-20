import History from "@/components/(about)/History"
import VisionMission from "@/components/(about)/VisionMission"

const page = () => {
  return (
    <section className="text-black bg-beigeCustom lg:bg-lightCustom w-full min-h-screen flex flex-col justify-center items-center md:py-10">
      <h1 className="text-3xl md:text-6xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mb-3 md:mt-0 text-center w-full">About Us</h1>
      <History/>
      <VisionMission/>
    </section>
  )
}

export default page