'use client';

import Link from 'next/link';

const AdminPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Super Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Button for Create Outlet */}
          <Link href="/admin/createOutlet">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Create Outlet
            </button>
          </Link>

          {/* Button for Create Worker */}
          <Link href="/admin/createWorker">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Create Worker
            </button>
          </Link>

          {/* Button for View Outlets */}
          <Link href="/admin/viewOutlet">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              View Outlets
            </button>
          </Link>

          {/* Button for View Worker */}
          <Link href="/admin/viewWorker">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              View Worker
            </button>
          </Link>

          {/* Button for View Order */}
          <Link href="/admin/viewOrder">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-black rounded-lg shadow-lg hover:bg-black-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              View Order
            </button>
          </Link>

          {/* Button for View Sales */}
          <Link href="/admin/viewSales">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              View Sales Report
            </button>
          </Link>

          {/* Button for View Sales */}
          <Link href="/admin/viewEmployee">
            <button className="w-full py-3 px-6 text-center text-white font-semibold bg-red-600 rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              View Employee Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
