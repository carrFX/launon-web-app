'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SalesReport() {
  const [orders, setOrders] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    // Mengambil data pesanan dari API
    axios
      .get(`${backendUrl}/api/order`)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
          calculateTotalSales(response.data); // Menghitung total penjualan
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [backendUrl]);

  const calculateTotalSales = (orders: any[]) => {
    // Menghitung total sales dari pesanan yang status bayar 'paid'
    const total = orders.reduce((sum, order) => {
      if (order.paymentStatus === 'paid' && order.totalPrice != null) {
        return sum + order.totalPrice;
      }
      return sum;
    }, 0);
    setTotalSales(total);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://as1.ftcdn.net/v2/jpg/08/65/54/64/1000_F_865546440_feHvE9ohNV0RaFAdYWs9vk4IEOYPPh6b.jpg")',
      }}
    >
      <header className="mt-4 bg-white bg-opacity-80 text-black py-5 shadow-xl rounded-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
            Sales Report
          </h1>
          <p className="text-lg mt-2 font-medium text-black">
            Overview of total sales from orders
          </p>
        </div>
        <div className="mt-5 mb-6 flex justify-center">
          <Link href="/outlets/dashboard">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Dashboard
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Sales Summary
          </h3>
          <p className="text-lg text-gray-800 mb-4">
            <span className="font-semibold">Total Sales: </span>$
            {totalSales.toFixed(2)}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order Details
          </h3>
          {orders.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Order ID
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Total Price
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Payment Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Pickup Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {/* Pastikan totalPrice bukan null/undefined */}
                      {order.totalPrice != null
                        ? `$${order.totalPrice.toFixed(2)}`
                        : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.paymentStatus}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {/* Format tanggal jika pickupSchedule ada */}
                      {order.pickupSchedule
                        ? new Date(order.pickupSchedule).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
