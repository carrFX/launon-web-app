'use client';

import { Worker } from "@/type/worker/workerType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


export default function OutletAdminAttendance() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const [outletWorkers, setOutletWorkers] = useState<Worker[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        if (id) {
          const response = await axios.get(`${backendUrl}/api/worker`);
          // Filter workers by outletId
          const filteredWorkers = response.data.filter(
            (worker: Worker) => worker.outletId === +id
          );
          setOutletWorkers(filteredWorkers);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, [id]);

  const groupByRole = (workers: Worker[]) => {
    return workers.reduce((groups: Record<string, Worker[]>, worker) => {
      if (!groups[worker.role]) {
        groups[worker.role] = [];
      }
      groups[worker.role].push(worker);
      return groups;
    }, {});
  };

  const groupedWorkers = groupByRole(outletWorkers);

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-center text-xl font-bold mb-6">Outlet Workers Attendance</h1>
      {outletWorkers.length === 0 ? (
        <p className="text-center">No workers found for this outlet.</p>
      ) : (
          <div className="p-4">
            {Object.keys(groupedWorkers).map((role) => (
              <div key={role} className="mb-8 border-b-2 border-stone-500 p-2">
                <h2 className="text-lg font-semibold mb-4 capitalize">{role}s</h2>
                <div className="flex flex-wrap gap-4 justify-start">
                  {groupedWorkers[role].map((worker) => (
                    <Link
                      key={worker.id}
                      href={`/worker/attendenceHistory/${worker.id}`}
                      className="flex flex-col p-4 border rounded-lg shadow hover:shadow-md transition-shadow bg-beigeCustom  w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
                    >
                      <h3 className="text-lg font-medium mb-2">{worker.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Email: {worker.email}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
  
}
