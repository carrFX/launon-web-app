'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { OutletWorker } from '@/type/worker/workerType'; // Pastikan tipe ini sudah didefinisikan dengan benar
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer dan toast
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet untuk toast

const OutletWorkersPage = () => {
  const [outletWorkers, setOutletWorkers] = useState<OutletWorker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<OutletWorker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<OutletWorker | null>(
    null,
  );
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [updatedOutletId, setUpdatedOutletId] = useState(0);

  useEffect(() => {
    const fetchOutletWorkers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/outlet-workers',
        );
        if (Array.isArray(response.data)) {
          setOutletWorkers(response.data);
          setFilteredWorkers(response.data);
        } else {
          throw new Error('Data format is incorrect, expected an array');
        }
      } catch (err) {
        setError('Failed to fetch outlet workers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOutletWorkers();
  }, []);

  useEffect(() => {
    const results = outletWorkers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.outletId.toString().includes(searchTerm),
    );
    setFilteredWorkers(results);
  }, [searchTerm, outletWorkers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (worker: OutletWorker) => {
    setSelectedWorker(worker);
    setUpdatedName(worker.name);
    setUpdatedEmail(worker.email);
    setUpdatedRole(worker.role);
    setUpdatedOutletId(worker.outletId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    // Menampilkan konfirmasi sebelum menghapus
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this outlet worker?',
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/outlet-workers/id/${id}`);
        setOutletWorkers((prevWorkers) =>
          prevWorkers.filter((worker) => worker.id !== id),
        );

        // Show success toast notification
        toast.success('Outlet worker deleted successfully!', {
          position: 'bottom-right', // Position toast at the bottom right
          autoClose: 3000, // Auto close after 3 seconds
          hideProgressBar: true, // Hide progress bar
          closeButton: false, // Hide close button
        });
      } catch (err) {
        setError('Failed to delete outlet worker. Please try again later.');

        // Show error toast notification
        toast.error('Failed to delete outlet worker!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedWorker) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/outlet-workers/id/${selectedWorker.id}`,
          {
            name: updatedName,
            email: updatedEmail,
            role: updatedRole,
            outletId: updatedOutletId,
          },
        );

        const updatedWorker = response.data;
        setOutletWorkers((prevWorkers) =>
          prevWorkers.map((worker) =>
            worker.id === updatedWorker.id ? updatedWorker : worker,
          ),
        );

        setIsModalOpen(false);
        setSelectedWorker(null);
        setUpdatedName('');
        setUpdatedEmail('');
        setUpdatedRole('');
        setUpdatedOutletId(0);

        // Show success toast notification
        toast.success('Update successful!', {
          position: 'bottom-right', // Position toast at the bottom right
          autoClose: 3000, // Auto close after 3 seconds
          hideProgressBar: true, // Hide progress bar
          closeButton: false, // Hide close button
        });
      } catch (err) {
        setError('Failed to update outlet worker. Please try again later.');
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="p-5 font-sans min-h-screen"
      style={{
        backgroundImage:
          "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Workers</h1>

      <div className="flex justify-center mb-8">
        <Link
          href="/admin"
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full max-w-md bg-white bg-opacity-90"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {worker.name}
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Role:</strong> {worker.role}
                </p>
                <p>
                  <strong>Email:</strong> {worker.email}
                </p>
                <p>
                  <strong>Outlet ID:</strong> {worker.outletId}
                </p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {new Date(worker.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{' '}
                  {new Date(worker.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="space-y-4 mt-4">
                <button
                  onClick={() => handleEditClick(worker)}
                  className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(worker.id)}
                  className="p-2 ml-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No outlet workers found
          </p>
        )}
      </div>

      {/* Modal for update */}
      {isModalOpen && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Update Worker</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full bg-white p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full bg-white p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                  className="w-full bg-white p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="outletId"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Outlet ID
                </label>
                <input
                  type="number"
                  id="outletId"
                  value={updatedOutletId}
                  onChange={(e) => setUpdatedOutletId(Number(e.target.value))}
                  className="w-full bg-white p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default OutletWorkersPage;
