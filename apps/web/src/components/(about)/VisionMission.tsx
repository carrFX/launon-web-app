import Image from "next/image"
import aboutImg from '@/data/dummy.json'

const VisionMission = () => {
  return (
    <div className="w-full bg-beigeCustom flex flex-col md:flex-row justify-center items-center lg:rounded-full">
        <div className="px-7 py-9 rounded-lg flex lg:flex-row flex-col items-center justify-between">

        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="rounded-full overflow-hidden">
            <Image
              src={aboutImg.about[3]}
              alt="about-launON."
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="lg:w-1/2 my-2 lg:text-left text-center md:pr-6">
            <h2 className="text-xl font-bold">Vission & Mission</h2>
            <p className="text-black text-medium md:text-lg mb-11">
            Visi kami di LaunON adalah merevolusi industri laundry dengan menyediakan layanan on-demand berkualitas tinggi yang sesuai dengan gaya hidup modern. Kami bercita-cita menjadi solusi laundry terdepan di era digital dengan mengutamakan kenyamanan, kecepatan, dan kepuasan pelanggan.
            Misi kami sederhana: mengambil alih urusan laundry Anda. Melalui pengalaman online yang mulus, kami berkomitmen untuk memberikan layanan laundry yang cepat, efisien, dan ramah lingkungan. Kami berupaya menciptakan proses yang bebas repot bagi pelanggan, memberdayakan para pekerja kami, dan terus berinovasi agar layanan kami selalu selangkah di depan kebutuhan pelanggan.
            </p>
        </div>
        
      </div>
    </div>
  )
}

export default VisionMission