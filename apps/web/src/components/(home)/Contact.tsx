import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline } from "react-icons/md";

const Contact = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-lightCustom pb-5 md:pb-10 text-black">
        <h1 className="font-bold text-2xl mt-8">Come Talk With Us</h1>
        <div className="mt-6 w-full flex flex-wrap gap-3 justify-evenly items-center">
            <a target='blank' href='https://www.instagram.com/' className="flex flex-col justify-center items-center hover:scale-110 duration-300">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full'>
                    <FaInstagram className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">Instagram</h1>
            </a>
            <a target='blank' href='https://mail.google.com/mail/u/0/' className="flex flex-col justify-center items-center hover:scale-110 duration-300">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full'>
                    <MdMailOutline className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <h1 className="text-xl font-bold md:text-lg tracking-wide text-center">Gmail</h1>
            </a>
            <a target='blank' href='https://wa.me/6281943381056?text=Halo%2C%20Selamat%20datang%20di%20LaunON.%20Style' className="flex flex-col justify-center items-center hover:scale-110 duration-300">
                <div className='w-fit h-fit p-4 bg-beigeCustom rounded-full'>
                    <FaWhatsapp className='w-16 h-16 md:w-24 md:h-24'/>
                </div>
                <h1 className="text-xl font-bold md:text-lg tracking-wider text-center">WhatsApp</h1>
            </a>
        </div>
    </section>
  )
}

export default Contact