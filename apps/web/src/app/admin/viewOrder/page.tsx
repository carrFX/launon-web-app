'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function OutletDetail() {
  const [outletId, setOutletId] = useState<number | string>('');
  const [outletData, setOutletData] = useState<any>(null);
  const [addressData, setAddressData] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order');
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  const fetchOutlet = async () => {
    if (!outletId || isNaN(Number(outletId))) {
      setError('Please enter a valid numeric ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const outletResponse = await axios.get(
        `http://localhost:8000/api/outlet/id/${outletId}`,
      );
      setOutletData(outletResponse.data);

      const addressResponse = await axios.get(
        `http://localhost:8000/api/address/outlet/${outletId}`,
      );
      setAddressData(addressResponse.data.data || null);

      const filtered = orders.filter(
        (order) => order.outletId === Number(outletId),
      );
      setFilteredOrders(filtered);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching data.');
      setOutletData(null);
      setAddressData(null);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (user: any) => {
    return user?.username || 'N/A';
  };

  const resetFilter = () => {
    setOutletData(null);
    setAddressData(null);
    setError(null);
    setOutletId('');
    setFilteredOrders(orders);
  };

  return (
    <div
      className="flex items-start justify-center min-h-screen bg-cover bg-center pt-10"
      style={{
        backgroundImage: `url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')`,
      }}
    >
      <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          View Orders
        </h1>
        <div className="flex justify-center mb-8">
          <Link
            href="/admin"
            className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Dashboard
          </Link>
        </div>
        <div className="mb-4">
          <label
            htmlFor="outletId"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter Outlet ID
          </label>
          <input
            type="text"
            id="outletId"
            value={outletId}
            onChange={(e) => setOutletId(e.target.value)}
            placeholder="Enter numeric ID"
            className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={fetchOutlet}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {loading ? 'Searching...' : 'Search Outlet'}
          </button>
          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
          {filteredOrders.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="border border-gray-300 px-4 py-2">
                      Order ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Outlet ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Customer
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="border border-gray-300 px-4 py-2">
                        {order.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.outletId || 'N/A'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {getUserName(order?.user)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.totalPrice || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-700 mt-2">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
