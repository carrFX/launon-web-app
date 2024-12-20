'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { GoHistory } from "react-icons/go";
import { WorkHistory } from '@/type/worker/workerType';

export default function WorkerHistory() {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  const [error, setError] = useState<string>('');
  const { id } = useParams();
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchWorkHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/work-history`,
        );
        setWorkHistory(response.data);
      } catch (err) {
        setError('Failed to fetch work history');
      }
    };

    fetchWorkHistory();
  }, []);

  const filteredWorkHistory = workHistory.filter(
    (history) => history.workerId === Number(id),
  );

  return (
    <div>
      <div className="bg-grayCustom text-beigeCustom flex justify-end items-center p-4">

        <Link
          href={`/worker/dashboard`}
          className="hover:underline"
        >
          My Dashboard
        </Link>
      </div>

      <div className="p-4 bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">My Working Histories</h1>

        {error && <p className="text-red-500">{error}</p>}

        {filteredWorkHistory.length ? (
          <div>
            {filteredWorkHistory.map((history) => (
              <div
                key={history.id}
                className="border border-gray-300 bg-beigeCustom rounded-lg p-4 mb-4 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="font-bold text-lg flex items-center gap-2">
                  {history.worker.name} - {history.station} <GoHistory />
                </h2>
                <p>
                  <strong>Order ID:</strong> {history.order.id}
                </p>
                <p>
                  <strong>Station:</strong> {history.station}
                </p>
                <p>
                  <strong>Order Status:</strong> {history.order.status}
                </p>
                <p>
                  <strong>Total Items:</strong> {history.order.totalItems}
                </p>
                <p>
                  <strong>Finished at:</strong>{' '}
                  {new Date(history.createdAt).toLocaleString()}
                </p>
                {history.pickupDelivery && (
                  <p>
                    <strong>Pickup/Delivery:</strong> {history.pickupDelivery}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No work history available for this worker.</p>
        )}
      </div>
    </div>
  );
}
