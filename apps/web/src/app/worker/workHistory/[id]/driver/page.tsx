'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PickupDeliveryRequest } from '@/type/worker/pdrType';
import Link from 'next/link';

export default function WorkHistoryDriver() {
  const { id } = useParams(); // Ambil ID driver dari URL
  const [pickupRequests, setPickupRequests] = useState<PickupDeliveryRequest[]>([]);
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchPickupRequests = async () => {
      try {
        if (id) {
          const response = await axios.get(`${backendUrl}/api/pdr/driver/${id}`);
          // Filter hanya status 'done'
          const filteredRequests = response.data.filter((request: PickupDeliveryRequest) => request.status === 'done');
          setPickupRequests(filteredRequests); // Simpan data ke state
        }
      } catch (error) {
        console.error('Error fetching pickup requests:', error);
      }
    };

    fetchPickupRequests();
  }, [id]);

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
    <div className='bg-beigeCustom'>
      <h1 className='text-xl font-bold text-center p-4'>My Working Histroy</h1>
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }} className='p-4'>
        {pickupRequests.map((request) => (
          <div
            key={request.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h2 className='text-center font-bold'>Request #{request.id}</h2>
            <p>
              <strong>Order ID:</strong> {request.orderId}
            </p>
            <p>
              <strong>From:</strong> {request.fromAddress?.address}, {request.fromAddress?.city}
            </p>
            <p>
              <strong>To:</strong> {request.toAddress?.address}, {request.toAddress?.city}
            </p>
            <p>
              <strong>Distance:</strong> {request.distance} km
            </p>
            <p>
              <strong>Delivered at  :</strong> {new Date(request.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
