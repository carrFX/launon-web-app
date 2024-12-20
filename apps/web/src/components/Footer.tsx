import Link from 'next/link';
import { FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { IoIosMail } from "react-icons/io";
import { RiTShirtAirLine } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer className="w-full bg-grayCustom flex flex-col justify-center items-center text-black">
      <div className="w-full flex flex-wrap justify-evenly items-start my-2 lg:my-4 py-8">
        <div className="flex flex-col justify-center items-center text-center">
          <div className='flex justify-center items-center gap-2 mb-1 text-black'>
            <RiTShirtAirLine className="text-base md:text-2xl font-bold"/>
            <h1 className="font-bold md:text-xl">LaunON.</h1>
          </div>
          <div className="w-fit bg-beigeCustom rounded-full px-2 py-2">
            <p className="font-semibold tracking-wide md:text-lg lg:text-xl text-black">
              Clean Is ON, With LaunON.
            </p>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-beigeCustom font-bold">About Us</h1>
          <ol className="mt-2 flex flex-col text-sm tracking-wide">
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <Link href={'/about'}>About LaunON &bull;</Link>
            </li>
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <Link href={'/outlets'}>Outlet location &bull;</Link>
            </li>
          </ol>
        </div>

        <div className="text-right">
          <h1 className="text-beigeCustom font-bold">Our Services</h1>
          <ol className="mt-2 flex flex-col text-sm tracking-wide">
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <Link href={'/services'}>
                Complete care wash &bull;
              </Link>
            </li>
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <Link href={'/user/orders'}>Tracking order status &bull;</Link>
            </li>
          </ol>
        </div>

        <div className="text-right">
          <h1 className="text-beigeCustom font-bold">Contact Us</h1>
          <ol className="mt-2 flex flex-col text-sm tracking-wide">
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <a target='blank'
                href={'https://wa.me/6281943381056?text=Halo%2C%20Selamat%20datang%20di%20LaunON.%20Style'}
                className="flex justify-end items-center gap-2"
              >
                <span className="pt-[1px]">&#40;+62&#41; 819-4883-1056</span>{' '}
                <FaPhoneAlt className='w-2 h-2 lg:w-3 lg:h-3'/>
              </a>
            </li>
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <a target='blank'
                href={'https://www.instagram.com/'}
                className="flex justify-end items-center gap-2"
              >
                <span className="pt-[1px]">&#64;launon_style</span>{' '}
                <FaInstagram className='w-2 h-2 lg:w-3 lg:h-3'/>
              </a>
            </li>
            <li className="duration-150 border-b border-b-transparent hover:border-b-black">
              <a target='blank'
                href={'https://mail.google.com/mail/u/0/'}
                className="flex justify-end items-center gap-2"
              >
                <span className="pt-[1px]">launonstyle&#64;gmail.com</span>{' '}
                <IoIosMail className='w-3 h-3 lg:w-4 lg:h-4'/>
              </a>
            </li>
          </ol>
        </div>
      </div>
      <div className="w-full bg-black text-center">
        <p className="text-white py-2 lg:py-4 px-2">
          &copy; 2024 LaunON. All Rights Reserved Owned by PT LaunON style{' '}
        </p>
      </div>
    </footer>
  );
};
