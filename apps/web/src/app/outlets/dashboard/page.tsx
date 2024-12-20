'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderData, OutletData } from '@/type/worker/outletType';
import { useRouter } from 'next/navigation';
import LogoutWorker from '@/components/(auth)/LogoutWorker';

export default function OutletDashboard() {
  const [outlet, setOutlet] = useState<OutletData | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const router = useRouter();
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const data = localStorage.getItem('outletAdmin');
    if (data) {
      const outletData: OutletData = JSON.parse(data);
      setOutlet(outletData);
    } else {
      router.push('/worker/login');
    }
  }, [router]);

  useEffect(() => {
    if (outlet) {
      axios
        .get(`${backendUrl}/api/order`)
        .then((response) => {
          const filteredOrders = response.data.filter(
            (order: OrderData) => order.outletId === outlet.outletId,
          );
          setOrders(filteredOrders);
          setFilteredOrders(filteredOrders);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [backendUrl, outlet]);

  const handleProcessOrder = (
    orderId: number,
    userId: number,
    distance: number,
  ) => {
    router.push(
      `/orders/${orderId}/process?userId=${userId}&distance=${distance}`,
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterOrders(query, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterOrders(searchQuery, status);
  };

  const handleByPassOrder = (orderId:number) =>{
    router.push(`/orders/${orderId}/bypass`)
  }

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('');
    setFilteredOrders(orders); // Reset filtered orders to show all orders
  };

  const filterOrders = (query: string, status: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = orders.filter((order) => {
      const matchesQuery = order.id.toString().includes(lowerCaseQuery);
      const matchesStatus = status ? order.status === status : true;
      return matchesQuery && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  const handleSalesReport = () => {
    router.push('/outlets/employeeOutlet');
  };

  const handleEmployeeReport = () => {
    router.push('/outlets/employeeOutlet');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://as1.ftcdn.net/v2/jpg/08/65/54/64/1000_F_865546440_feHvE9ohNV0RaFAdYWs9vk4IEOYPPh6b.jpg")',
      }}
    >
      <LogoutWorker />
      <header className="mt-4 bg-white bg-opacity-80 text-black py-5 shadow-xl rounded-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
            Outlet Dashboard
          </h1>
          <p className="text-lg mt-2 font-medium text-black">
            Manage your orders and outlet details effortlessly
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <button
              onClick={handleSalesReport}
              className="p-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700"
            >
              Sales Report
            </button>
            <button
              onClick={handleEmployeeReport}
              className="p-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
            >
              Employee Report
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        {outlet ? (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-8 border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {outlet.outletName}!
              </h2>
              <p className="text-gray-500 mt-2">Email: {outlet.outletEmail}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by Order ID"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="p-2 bg-white text-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="p-2 bg-white text-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="waiting_for_pickup">waiting_for_pickup</option>
                <option value="on_the_way_to_outlet">
                  on_the_way_to_outlet
                </option>
                <option value="arrived_at_outlet">arrived_at_outlet</option>
                <option value="weighed">weighed</option>
                <option value="washed">washed</option>
                <option value="ironed">ironed</option>
                <option value="packed">packed</option>
                <option value="waiting_for_payment">waiting_for_payment</option>
                <option value="ready_for_delivery">ready_for_delivery</option>
                <option value="on_the_way_to_customer">
                  on_the_way_to_customer
                </option>
                <option value="delivered_to_customer">
                  delivered_to_customer
                </option>
                <option value="recalculate">recalculate</option>
              </select>
              <button
                onClick={handleReset}
                className="p-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset
              </button>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders</h3>
            {filteredOrders.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredOrders.map((order) => (
                  <li
                    key={order.id}
                    className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Order ID:</span>{' '}
                        {order.id}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Status:</span>{' '}
                        {order.status}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Pickup Schedule:</span>{' '}
                        {new Date(order.pickupSchedule).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Total Items:</span>{' '}
                        {order.totalItems}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Total Price:</span> $
                        {order.totalPrice
                          ? order.totalPrice.toFixed(2)
                          : '0.00'}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Payment Status:</span>{' '}
                        {order.paymentStatus}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Distance:</span>{' '}
                        {order.pickupDeliveryRequests[0]?.distance || 0} km
                      </p>
                    </div>

                    {(order.status === 'arrived_at_outlet' ||
                      order.status === 'recalculate') && (
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-4 rounded-lg">
                        <p className="text-yellow-800 font-medium">
                          ⚠️ This order needs to be processed soon.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      {(order.status === 'arrived_at_outlet') && (
                        <button
                          onClick={() =>
                            handleProcessOrder(
                              order.id,
                              order.userId,
                              order.pickupDeliveryRequests[0]?.distance || 0,
                            )
                          }
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Process
                        </button>
                      )}
                      {(order.status === 'recalculate') && (
                        <button
                          onClick={() =>
                            handleByPassOrder(
                              +order.id,
                            )
                          }
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Process
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-700">No orders available.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-700">Loading outlet data...</p>
          </div>
        )}
      </main>
    </div>
  );
}
