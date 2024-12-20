'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderItemData } from '@/type/worker/outletType';

export default function ProcessOrderPage() {
  const router = useRouter();
  const { orderId } = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const distance = parseFloat(searchParams.get('distance') || '0');
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  const [weight, setWeight] = useState(0);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderItems({
      ...orderItems,
      [name]: parseInt(value) || 0,
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value) || 0);
  };

  useEffect(() => {
    const total = Object.values(orderItems).reduce(
      (acc, item) => acc + item,
      0,
    );
    setTotalItems(total);
  }, [orderItems]);

  const handleSubmit = async () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async (isConfirmed: boolean) => {
    if (!isConfirmed) {
      setShowConfirmation(false);
      return;
    }

    try {
      const orderItemResponse = await axios.post(
        `${backendUrl}/api/order-item`,
        {
          orderId: +orderId,
          ...orderItems,
        },
      );

      if (
        orderItemResponse.status === 201 ||
        orderItemResponse.status === 200
      ) {
        // Update order price and weight

        console.log(totalItems);

        await axios.patch(`${backendUrl}/api/order/price/${orderId}`, {
          weight: weight,
          distance: distance,
          userId: userId,
          totalItems: +totalItems,
        });

        await axios.patch(`${backendUrl}/api/order/${orderId}`, {
          status: 'weighed', // Mark as 'washed'
          userId: userId,
        });

        alert(
          "Order items updated and order status set to 'weighed' successfully!",
        );
        router.push('/outlets/dashboard');
      } else {
        console.error(
          'Failed to create order-item. Status:',
          orderItemResponse.status,
        );
        alert('Failed to create order-item.');
      }
    } catch (error) {
      console.error('Error updating order items:', error);
    }
    setShowConfirmation(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Process Order {orderId} , userID : {userId} , distance : {distance}
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
        <div className="mb-4 flex items-center gap-2">
          <label className="w-1/2 text-gray-700 font-bold" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={handleWeightChange}
            className="w-1/2 px-3 py-2 border rounded bg-white border-slate-300"
            min="0"
          />
        </div>

        <div className="mt-4 text-lg font-semibold">
          Total Items: {totalItems}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          Save Order Items
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
    </div>
  );
}
