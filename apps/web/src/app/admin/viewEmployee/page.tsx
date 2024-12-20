'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Type Definitions
interface Outlet {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkerJobHistory {
  order: {
    status: string;
  };
}

interface OutletWorker {
  outlet: Outlet | null;
  id: number;
  outletId: number | null;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const OutletWorkers = () => {
  const [outletWorkers, setOutletWorkers] = useState<OutletWorker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<OutletWorker[]>([]);
  const [outletFilter, setOutletFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [dateFilterType, setDateFilterType] = useState<
    'day' | 'month' | 'year'
  >('day');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for worker job history
  const [workerJobHistory, setWorkerJobHistory] = useState<WorkerJobHistory[]>(
    [],
  );
  const [jobHistoryLoading, setJobHistoryLoading] = useState<boolean>(false);
  const [jobHistoryError, setJobHistoryError] = useState<string | null>(null);

  // Fetch outlet workers on component mount
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<OutletWorker[]>(
          'http://localhost:8000/api/outlet-workers/',
        );
        setOutletWorkers(response.data);
        setFilteredWorkers(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error fetching outlet workers');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const fetchWorkerJobHistory = async (workerId: number) => {
    setJobHistoryLoading(true);
    setJobHistoryError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/work-history/${workerId}`,
      );
      setWorkerJobHistory(response.data);
    } catch (err: any) {
      setJobHistoryError('Error fetching job history');
    } finally {
      setJobHistoryLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = [...outletWorkers];

    if (outletFilter) {
      const searchKeyword = outletFilter.toLowerCase();
      filtered = filtered.filter(
        (worker) => worker.outletId?.toString().includes(searchKeyword), // Cari berdasarkan outletId
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((worker) => {
        const workerDate = new Date(worker.createdAt);
        switch (dateFilterType) {
          case 'day':
            return workerDate.toISOString().split('T')[0] === dateFilter;
          case 'month':
            const workerMonth = `${workerDate.getFullYear()}-${String(workerDate.getMonth() + 1).padStart(2, '0')}`;
            return workerMonth === dateFilter;
          case 'year':
            return workerDate.getFullYear().toString() === dateFilter;
          default:
            return false;
        }
      });
    }

    setFilteredWorkers(filtered);
  };

  const handleReset = () => {
    setOutletFilter('');
    setDateFilter('');
    setDateFilterType('day');
    setFilteredWorkers(outletWorkers);
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

  const getCompletedOrdersCount = (workerId: number) => {
    const completedOrders = workerJobHistory.filter(
      (history) => history.order.status === 'completed',
    );
    return completedOrders.length;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage:
          'url("https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg")',
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Employee Performance Report
        </h1>
        <div className="flex justify-center mb-8">
          <Link
            href="/admin"
            className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Dashboard
          </Link>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Filter by Outlet
          </label>
          <input
            type="text"
            placeholder="Enter Outlet ID"
            value={outletFilter}
            onChange={(e) => setOutletFilter(e.target.value)}
            className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="block text-gray-700 font-medium mb-2 mt-4">
            Filter by Date
          </label>
          {renderDateInput()}
          <label className="block text-gray-700 font-medium mb-2 mt-4">
            Date Filter Type
          </label>
          <select
            value={dateFilterType}
            onChange={(e) =>
              setDateFilterType(e.target.value as 'day' | 'month' | 'year')
            }
            className="w-full bg-white text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="day">Per Day</option>
            <option value="month">Per Month</option>
            <option value="year">Per Year</option>
          </select>
          <div className="flex mt-4 gap-4">
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>
        {loading ? (
          <p className="text-gray-600 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-red-600 mt-4">{error}</p>
        ) : filteredWorkers.length > 0 ? (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Worker ID</th>
                <th className="px-4 py-2 text-left">Outlet ID</th>
                <th className="px-4 py-2 text-left">Worker</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Completed Orders</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker: any) => (
                <tr key={worker.id}>
                  <td className="px-4 py-2">{worker.id}</td>
                  <td className="px-4 py-2">{worker.outletId}</td>
                  <td className="px-4 py-2">{worker.name}</td>
                  <td className="px-4 py-2">{worker.role}</td>
                  <td className="px-4 py-2">
                    {new Date(worker.createdAt).toLocaleDateString()}
                  </td>
                  {worker.role == 'driver' ? (
                    <td className="px-4 py-2">
                      {worker.pickupDeliveries.length}
                    </td>
                  ) : (
                    <td className="px-4 py-2">{worker.jobHistory.length}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 mt-4">No workers found.</p>
        )}
      </div>
    </div>
  );
};

export default OutletWorkers;
