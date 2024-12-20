'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderItemData } from '@/type/worker/outletType';

export default function IronStation() {
  const router = useRouter();
  const { orderId } = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const workerId = searchParams.get('outletWorkerId');
  const [orderItemReference, setOrderItemReference] =
    useState<OrderItemData[]>();
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  const [orderItems, setOrderItems] = useState<OrderItemData>({
    shirt: 0,
    longShirt: 0,
    pants: 0,
    longPant: 0,
    veil: 0,
    underwear: 0,
    bedsheet: 0,
    pillowCase: 0,
    blanket: 0,
    towel: 0,
    curtain: 0,
  });

  const [totalItems, setTotalItems] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notMatchConfirmation, setNotMatchConfirmation] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setOrderItems({
      ...orderItems,
      [name]: parseInt(value) || 0,
    });
  };

  useEffect(() => {
    const total = Object.values(orderItems).reduce(
      (acc, item) => acc + item,
      0,
    );
    setTotalItems(total);
  }, [orderItems]);

  useEffect(() => {
    const fetchOrderReference = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/order-item/order/${orderId}`,
        );
        setOrderItemReference(response.data);
      } catch (error) {
        console.error('Error fetching order item reference:', error);
      }
    };
    fetchOrderReference();
  }, [orderId]);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async (isConfirmed: boolean) => {
    setShowConfirmation(false);
    if (!isConfirmed) return;
    if (!orderItemReference || orderItemReference.length === 0) return;

    const referenceData: OrderItemData = {
      shirt: orderItemReference[0].shirt || 0,
      longShirt: orderItemReference[0].longShirt || 0,
      pants: orderItemReference[0].pants || 0,
      longPant: orderItemReference[0].longPant || 0,
      veil: orderItemReference[0].veil || 0,
      underwear: orderItemReference[0].underwear || 0,
      bedsheet: orderItemReference[0].bedsheet || 0,
      pillowCase: orderItemReference[0].pillowCase || 0,
      blanket: orderItemReference[0].blanket || 0,
      towel: orderItemReference[0].towel || 0,
      curtain: orderItemReference[0].curtain || 0,
    };

    if (JSON.stringify(orderItems) !== JSON.stringify(referenceData)) {
      setNotMatchConfirmation(true);
      console.log('data:', orderItems);
      console.log('match to:', referenceData);
      return;
    }
    if (!userId || !workerId) return;
    try {
      await axios.patch(`${backendUrl}/api/order/${orderId}`, {
        status: 'ironed',
        userId,
      });

      await axios.post(`${backendUrl}/api/work-history`, {
        workerId: +workerId,
        orderId: +orderId,
        station: 'packer',
      });

      await axios.post(`${backendUrl}/api/notification`, {
        userId: +userId,
        title: `Order ${orderId} Status Updated`,
        message: "Your order status has been updated to 'ironed'.",
      });

      router.push('/worker/dashboard');
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const handleMismatchConfirm = async (recalculate: boolean) => {
    setNotMatchConfirmation(false);
    if (!recalculate) {
      try {
        await axios.patch(`${backendUrl}/api/order/${orderId}`, {
          status: 'recalculate',
          userId,
        });

        router.push('/worker/dashboard');
      } catch (error) {
        console.error('Error processing order:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        IRON STATION <br /> Order {orderId}, userID: {userId}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {Object.keys(orderItems).map((item) => (
          <div key={item} className="mb-4 flex items-center gap-2">
            <label className="w-1/2 text-gray-700 font-bold" htmlFor={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
            <input
              type="number"
              id={item}
              name={item}
              value={orderItems[item as keyof OrderItemData]}
              onChange={handleInputChange}
              className="w-1/2 px-3 py-2 border rounded bg-white border-slate-300"
              min="0"
            />
          </div>
        ))}

        <div className="mt-4 text-lg font-semibold">
          Total Items: {totalItems}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          Process the Order
        </button>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">
              Are you sure you want to save the order?
            </h3>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => handleConfirm(true)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {notMatchConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Jumlah input tidak cocok</h3>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => handleMismatchConfirm(false)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Lapor Admin
              </button>
              <button
                onClick={() => handleMismatchConfirm(true)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Hitung Ulang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
