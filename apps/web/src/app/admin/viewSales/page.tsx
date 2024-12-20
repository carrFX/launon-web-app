'use client';

import { useState, useEffect } from 'react';
import { IOrder } from '@/type/orderType';
import axios from 'axios';
import Link from 'next/link'; // Mengimpor Link dari Next.js

export default function OrderList(): JSX.Element {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [outletFilter, setOutletFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [dateFilterType, setDateFilterType] = useState<string>('day'); // day, month, year
  const [loading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outlets, setOutlets] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchOutlets(); // Load outlets data
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/order/');
      setOrders(response.data);
      setFilteredOrders(response.data);
      let tot: number = 0;
      response.data.map((item: any) => {
        tot += item.totalPrice;
      });
      setIncomes(tot);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOutlets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/outlet/');
      setOutlets(response.data.data);
    } catch (err) {
      console.error('Error fetching outlets', err);
    }
  };

  const handleFilter = () => {
    let filtered = [...orders];
    console.log(filtered, '<><><');

    // Filter by Outlet
    if (outletFilter) {
      const searchKeyword = outletFilter.toLowerCase();
      filtered = filtered.filter((order) => {
        const outletName = order.outlet?.name?.toLowerCase() || '';
        console.log(outletName.indexOf(searchKeyword) !== -1, '???');

        return outletName.indexOf(searchKeyword) !== -1;
      });
    }

    // Filter by Date (Day, Month, Year)
    if (dateFilter) {
      filtered = filtered.filter((order: IOrder) => {
        const orderDate = new Date(order.createdAt as string);
        let formattedDate = '';

        switch (dateFilterType) {
          case 'day':
            formattedDate = orderDate.toISOString().split('T')[0]; // YYYY-MM-DD
            return formattedDate === dateFilter;
          case 'month':
            formattedDate = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
            return formattedDate === dateFilter;
          case 'year':
            formattedDate = `${orderDate.getFullYear()}`;
            return formattedDate === dateFilter;
          default:
            return false;
        }
      });
    }

    setFilteredOrders(filtered);
    let tot: number = 0;
    filtered.map((item: any) => {
      tot += item.totalPrice;
    });
    setIncomes(tot);
  };

  const handleReset = () => {
    setOutletFilter('');
    setDateFilter('');
    setDateFilterType('day');
    setFilteredOrders(orders);
    let tot: number = 0;
    orders.map((item: any) => {
      tot += item.totalPrice;
    });
    setIncomes(tot);
  };

  const getOutletName = (outlet: any | null) => {
    return outlet?.name || 'N/A';
  };

  const getUserName = (user: any) => {
    return user?.username || 'N/A';
  };

  const renderDateInput = () => {
    if (dateFilterType === 'year') {
      return (
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Year</option>
          {new Array(50).fill(null).map((_, index) => {
            const year = new Date().getFullYear() - index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      );
    } else if (dateFilterType === 'month') {
      return (
        <input
          type="month"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      );
    } else {
      return (
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-8"
      style={{
        backgroundImage:
          'url("https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg"), url("https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">
          Sales Report
        </h1>
        {/* Kembali ke Dashboard Button */}
        <div className="mt-5 mb-6 flex justify-center">
          <Link href="/admin">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Dashboard
            </button>
          </Link>
        </div>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filter by Outlet */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Filter by Outlet
            </label>
            <input
              type="text"
              placeholder="Enter Outlet Name"
              value={outletFilter}
              onChange={(e) => setOutletFilter(e.target.value)}
              className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Filter by Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Filter by Date
            </label>
            {renderDateInput()}
          </div>

          {/* Date Filter Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date Filter Type
            </label>
            <select
              value={dateFilterType}
              onChange={(e) => setDateFilterType(e.target.value)}
              className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="day">Per Day</option>
              <option value="month">Per Month</option>
              <option value="year">Per Year</option>
            </select>
          </div>

          {/* Filter Button */}
          <div className="flex items-end space-x-2">
            <button
              onClick={handleFilter}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Apply Filters
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Reset Filters
            </button>
          </div>
        </div>{' '}
        <div className="flex mb-2 items-end space-x-2">
          <h5>Total Income:</h5>

          {/* Reset Button */}
          <h5>{incomes.toLocaleString()}</h5>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="spinner-border animate-spin w-8 h-8 border-4 rounded-full border-blue-500"></div>
          </div>
        )}
        {/* Orders Table */}
        {!loading && filteredOrders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Order ID</th>
                  <th className="border border-gray-300 px-4 py-2">Outlet</th>
                  <th className="border border-gray-300 px-4 py-2">Customer</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {getOutletName(order?.outlet)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {getUserName(order?.user)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(order.createdAt as string).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.totalPrice?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* No Orders Found */}
        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-4 text-gray-700">
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
