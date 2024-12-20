import { BsStopwatch } from "react-icons/bs";
import { GiFallingLeaf } from "react-icons/gi";
import { LuHeartHandshake } from "react-icons/lu";
import { TbMapSearch } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
const ChooseUs = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-lightCustom">
        <div className="text-center mt-10 px-5 md:px-0">
          <h1 className="text-2xl md:text-5xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mb-3 md:mt-0">Why Should You Choose Us?</h1>
          <p>Kemudahan dan efisiensi bagi pelanggan dalam mengurus kebutuhan cucian dengan berbagai fitur unggulan kami.</p>
        </div>

        <div className="w-full flex flex-wrap justify-evenly items-start my-10 text-black">
            <div className="w-full md:w-1/3 lg:w-1/4 text-center flex flex-col justify-center items-center my-5 mx-3">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full mb-2'>
                    <BsStopwatch className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <div className="px-2 md:px-14">
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Express Clean</h1>
                <p>Layanan cuci kilat dengan waktu yang  cocok untuk pelanggan dengan kebutuhan mendesak.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 text-center flex flex-col justify-center items-center my-5 mx-3">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full mb-2'>
                    <GiFallingLeaf className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <div className="px-2 md:px-14">
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Eco Wash</h1>
                <p>Program cuci ramah lingkungan menggunakan deterjen dan proses yang minim dampak terhadap lingkungan.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 text-center flex flex-col justify-center items-center my-5 mx-3">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full mb-2'>
                    <LuHeartHandshake className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <div className="px-2 md:px-14">
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Full Responsibility</h1>
                <p>Tanggung jawab penuh untuk memastikan kepuasan pelanggan menjadi prioritas utama.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 text-center flex flex-col justify-center items-center my-5 mx-3">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full mb-2'>
                    <TbMapSearch className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <div className="px-2 md:px-14">
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Laundry Tracking</h1>
                <p> Memungkinkan pelanggan memantau status pesanan secara real-time.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 text-center flex flex-col justify-center items-center my-5 mx-3">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full mb-2'>
                    <AiOutlineSchedule className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <div className="px-2 md:px-14">
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Pick & Drop Schedule</h1>
                <p>Fleksibilitas dalam mengatur waktu antar / jemput on schedule</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ChooseUs