// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-64 bg-gray-800 h-full fixed top-0 left-0">
      <div className="flex items-center justify-center h-16 text-white text-xl font-bold">
        Admin Menu
      </div>
      <ul className="text-gray-300">
        <li
          className={
            router.pathname === '/outlet_management' ? 'bg-gray-700' : ''
          }
        >
          <Link href="/outlet_management">
            <a className="block px-4 py-2 hover:bg-gray-700">
              Outlet Management
            </a>
          </Link>
        </li>
        <li
          className={
            router.pathname === 'user/laundry_item_management'
              ? 'bg-gray-700'
              : ''
          }
        >
          <Link href={'/user/laundryitemManagement'}>
            <a className="block px-4 py-2 hover:bg-gray-700">
              Laundry Item Management
            </a>
          </Link>
        </li>
        <li
          className={router.pathname === '/assign_roles' ? 'bg-gray-700' : ''}
        >
          <Link href="/assign_roles">
            <a className="block px-4 py-2 hover:bg-gray-700">
              Assign Outlet Admin, Worker, and Driver
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
