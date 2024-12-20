import Image from "next/image"
import aboutImg from '@/data/dummy.json'

const History = () => {
  return (
    <div className="w-full bg-beigeCustom flex flex-col md:flex-row justify-center items-center lg:rounded-full lg:mb-3">
        <div className="px-7 py-9 rounded-lg flex lg:flex-row flex-col-reverse items-center justify-between">
        <div className="lg:w-1/2 my-2 lg:text-right text-center md:pr-6">
            <h2 className="text-xl font-bold">History of LaunON.</h2>
            <p className="text-black text-medium md:text-lg mb-11">
            LaunON lahir dari kebutuhan akan layanan laundry yang lebih praktis dan terpercaya di tengah kehidupan modern yang serba cepat. Didirikan pada tahun 2020, LaunON awalnya merupakan usaha kecil dengan tujuan sederhana: meringankan beban laundry bagi mereka yang sibuk. Seiring waktu, LaunON berkembang menjadi platform online terpercaya yang menawarkan solusi laundry hanya dengan beberapa klik. Dengan teknologi inovatif, LaunON menghubungkan pelanggan dengan outlet terdekat, memastikan layanan penjemputan, perawatan profesional, dan pengiriman tepat waktu dengan standar kualitas terbaik.
            </p>
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
    </div>
  )
}

export default History