"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { OrderData, OutletData } from "@/type/worker/outletType";
import { useRouter } from 'next/navigation';


export default function WasherDashboard() {
    const [outletWorker, setoutletWorker] = useState<any | null>(null);
    const [orders, setOrders] = useState<OrderData[]>([]);
    const router = useRouter();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    useEffect(() => {
        const data = localStorage.getItem('outletWorker');
        if (data) {
            const outletData: OutletData = JSON.parse(data);
            setoutletWorker(outletData);
        }
    }, []);

    useEffect(() => {
        if (outletWorker) {
            axios.get(`${backendUrl}/api/order`)
                .then((response) => {
                    const filteredOrders = response.data.filter((order: OrderData) => order.outletId === outletWorker.outletId && order.status == "weighed");
                    setOrders(filteredOrders);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                });
        }
    }, [outletWorker]);

    const handleProcessOrder = (orderId: number, userId: number, outletWorkerId:number) => {
        router.push(`/orders/${orderId}/wash?userId=${userId}&outletWorkerId=${outletWorkerId}`);
    };
    
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500 bg-washer bg-img">
            <div className="p-6 bg-slate-300 bg-opacity-65 border border-black rounded-lg h-fit shadow-md w-full sm:max-w-md lg:max-w-7xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Washer Dashboard</h2>
                
                {outletWorker ? (
                    <div>
                        <p><strong>Name:</strong> {outletWorker.name}</p>
                        <p><strong>Email:</strong> {outletWorker.email}</p>

                        <h3 className="mt-6 mb-2 text-lg font-semibold">Orders</h3>
                        {orders.length > 0 ? (
                            <ul className="flex flex-wrap gap-2"> 
                                {orders.map((order) => (
                                    <li key={order.id} className="mb-4 p-4 border border-yellow-600 rounded-lg w-96 bg-beigeCustom">
                                        <p><strong>Order ID:</strong> {order.id}</p>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        <p><strong>Pickup Schedule:</strong> {new Date(order.pickupSchedule).toLocaleString()}</p>
                                        <p><strong>Total Items:</strong> {order.totalItems}</p>
                                        <p><strong>Total Price:</strong> {order.totalPrice}</p>
                                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                        <p><strong>Distance:</strong> {order.pickupDeliveryRequests[0]?.distance || 0}</p>
                                        {order.status === "weighed" && (
                                            <div className=" text-red-800 my-1 rounded text-center">
                                                <strong>⚠️ This order needs to be washed</strong>
                                                <button
                                                    onClick={() => handleProcessOrder(order.id, order.userId, outletWorker.id)}
                                                    className="mt-2 bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900"
                                                >
                                                    Process Order
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No orders found for this outlet.</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}