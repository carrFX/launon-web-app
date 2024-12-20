'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiTShirtAirLine } from 'react-icons/ri';
import { IoMdLogIn } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileState, logoutAction } from '@/redux/slices/authSlice';
import { logoutFetchDb } from '@/lib/authLib';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProfileState());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { result, ok } = await logoutFetchDb();
      if (!ok || !result) throw new Error(result?.message || 'Logout failed');
      dispatch(logoutAction());
      toast.success(result.message);
      setUserMenuIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error instanceof Error ? error.message : 'Error logging out');
    }
  };

  const AdminNavigation = () => (
    <>
      <Link
        href={`/admin`}
        className="w-full px-4 py-2 hover:bg-gray-100 duration-150 cursor-pointer border-b border-b-black"
        onClick={() => setUserMenuIsOpen(false)}
      >
        Super Admin Dashboard
      </Link>
    </>
  );

  return (
    <nav className="bg-[#ffffff81] text-black flex justify-between backdrop-blur-sm py-3 sticky top-0 items-center px-3 lg:px-6 z-[10000] border-b border-b-black">
      <div>
        <Link
          href={'/'}
          className="text-black cursor-pointer flex justify-center items-center gap-2"
        >
          <RiTShirtAirLine className="text-sm md:text-xl" />
          <p className="text-sm font-semibold md:text-lg md:font-bold lg:text-xl lg:font-extrabold">
            LaunON.
          </p>
        </Link>
      </div>

      <div>
        <ul className="flex gap-3 lg:gap-5 justify-center items-center">
          <li>
            <Link
              href={'/'}
              className="hidden md:block pb-[2px] -mb-1 uppercase border-b border-b-transparent tracking-wide text-xs font-normal lg:text-sm lg:font-medium hover:border-b-black duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/about'}
              className="uppercase border-b pb-1 border-b-transparent tracking-wide text-xs font-normal lg:text-sm lg:font-medium hover:border-b-black duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={'/services'}
              className="uppercase border-b pb-1 border-b-transparent tracking-wide text-xs font-normal lg:text-sm lg:font-medium hover:border-b-black duration-300"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href={'/outlets'}
              className="uppercase border-b pb-1 border-b-transparent tracking-wide text-xs font-normal lg:text-sm lg:font-medium hover:border-b-black duration-300"
            >
              Outlets
            </Link>
          </li>
        </ul>
      </div>

      {user.isLogin ? (
        <div
          className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer"
          onClick={() => setUserMenuIsOpen(true)}
        >
          <p className="hidden md:block w-[118px] text-right truncate font-semibold">
            {user.username}
          </p>
          <div
            className={`avatar border-2 p-[1px] rounded-full duration-300 ${userMenuIsOpen ? 'border-grayCustom' : 'border-transparent'}`}
          >
            <div className="w-11 rounded-full">
              <Image
                width={40}
                height={40}
                src={
                  user.avatar ||
                  'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                }
                alt={user.username || 'avatar'}
              />
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={'/auth/login'}
          className="flex justify-center items-center hover:translate-x-2 duration-200"
        >
          <IoMdLogIn className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]" />
        </Link>
      )}

      <div
        ref={navMenuRef}
        className={`absolute right-1 mt-60 md:mt-64 w-48 bg-beigeCustom rounded-md shadow-lg transform transition-all duration-300 ease-out ${userMenuIsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <ul className="py-2 text-black text-center flex flex-col justify-center items-center">
          <Link
            href={`/user/profile/${user.id}`}
            className="w-full px-4 py-2 hover:bg-gray-100 duration-150 cursor-pointer border-b border-b-black"
            onClick={() => setUserMenuIsOpen(false)}
          >
            Profile
          </Link>
          {['admin', 'superAdmin', 'worker'].includes(user.role) ? (
            <AdminNavigation />
          ) : (
            <Link
              href={'/user/orders'}
              className="w-full px-4 py-2 hover:bg-gray-100 duration-150 cursor-pointer border-b border-b-black"
              onClick={() => setUserMenuIsOpen(false)}
            >
              My Orders
            </Link>
          )}
          <li className="mt-10 flex justify-center items-center">
            <p
              className="w-fit px-2 py-1 bg-red-800 text-white duration-150 cursor-pointer border border-beigeCustom rounded-full hover:scale-110"
              onClick={handleLogout}
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
