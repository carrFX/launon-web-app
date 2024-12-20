// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { Outlet } from '@/type/outlet';

// const OutletsPage = () => {
//   const [outlets, setOutlets] = useState<Outlet[]>([]);
//   const [filteredOutlets, setFilteredOutlets] = useState<Outlet[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchOutlets = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/outlet');

//         if (Array.isArray(response.data.data)) {
//           setOutlets(response.data.data);
//           setFilteredOutlets(response.data.data);
//         } else {
//           throw new Error('Data format is incorrect');
//         }
//       } catch (err) {
//         setError('Failed to fetch outlets. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOutlets();
//   }, []);

//   useEffect(() => {
//     const results = outlets.filter(
//       (outlet) =>
//         outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         outlet.email.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//     setFilteredOutlets(results);
//   }, [searchTerm, outlets]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleDelete = async (id: number) => {
//     const isConfirmed = window.confirm(
//       'Are you sure you want to delete this outlet?',
//     );

//     if (isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:8000/api/outlet/id/${id}`);
//         setOutlets(outlets.filter((outlet) => outlet.id !== id));
//         setFilteredOutlets(
//           filteredOutlets.filter((outlet) => outlet.id !== id),
//         );
//         alert('Outlet deleted successfully!');
//       } catch (err) {
//         alert('Failed to delete outlet.');
//       }
//     }
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div
//       className="p-5 font-sans min-h-screen"
//       style={{
//         backgroundImage:
//           "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg'), url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <h1 className="text-3xl font-bold text-center mb-8">Outlets</h1>

//       {/* Dashboard Button */}
//       <div className="flex justify-center mb-8">
//         <Link
//           href="/admin"
//           className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Go to Dashboard
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="p-2 border rounded w-full max-w-md bg-white bg-opacity-90"
//         />
//       </div>

//       {/* Outlets Grid */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {filteredOutlets.map((outlet) => (
//           <div
//             key={outlet.id}
//             className="block p-6 border border-gray-200 rounded-lg shadow-md bg-white bg-opacity-75 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
//           >
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {outlet.name}
//               </h2>
//               <p className="text-gray-600">Email: {outlet.email}</p>
//               <p className="text-gray-600">
//                 Created At: {new Date(outlet.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <div className="space-y-4 mt-4">
//               {/* Update Button */}
//               <Link
//                 href={`/admin/${outlet.id}/updateOutlet`}
//                 className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
//               >
//                 Update
//               </Link>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(outlet.id)}
//                 className="p-2 ml-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//         {filteredOutlets.length === 0 && (
//           <p className="text-center text-gray-500 w-full">No outlets found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OutletsPage;
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from '@/type/outlet';
import Link from 'next/link';
import AddressComp from '@/components/(profile)/AddressComp';

const OutletsPage = () => {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [filteredOutlets, setFilteredOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null); // State untuk outlet yang sedang diedit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '', // Menambahkan field password
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State untuk modal konfirmasi penghapusan
  const [outletToDelete, setOutletToDelete] = useState<Outlet | null>(null); // Outlet yang akan dihapus

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/outlet');
        if (Array.isArray(response.data.data)) {
          setOutlets(response.data.data);
          setFilteredOutlets(response.data.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (err) {
        setError('Failed to fetch outlets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOutlets();
  }, []);

  useEffect(() => {
    const results = outlets.filter(
      (outlet) =>
        outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredOutlets(results);
  }, [searchTerm, outlets]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (outlet: Outlet) => {
    setEditingOutlet(outlet); // Set outlet yang sedang diedit
    setFormData({
      name: outlet.name,
      email: outlet.email,
      address: outlet.address,
      password: '', // Reset password field
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (editingOutlet) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/outlet/id/${editingOutlet.id}`,
          formData,
        );
        const updatedOutlet = response.data;
        setOutlets((prev) =>
          prev.map((outlet) =>
            outlet.id === updatedOutlet.id ? updatedOutlet : outlet,
          ),
        );
        setFilteredOutlets((prev) =>
          prev.map((outlet) =>
            outlet.id === updatedOutlet.id ? updatedOutlet : outlet,
          ),
        );
        setEditingOutlet(null); // Tutup form setelah update
        alert('Outlet updated successfully!');
      } catch (err) {
        alert('Failed to update outlet.');
      }
    }
  };

  const handleDelete = async () => {
    if (outletToDelete) {
      try {
        await axios.delete(
          `http://localhost:8000/api/outlet/id/${outletToDelete.id}`,
        );
        setOutlets(outlets.filter((outlet) => outlet.id !== outletToDelete.id));
        setFilteredOutlets(
          filteredOutlets.filter((outlet) => outlet.id !== outletToDelete.id),
        );
        setShowDeleteModal(false); // Tutup modal setelah penghapusan
        alert('Outlet deleted successfully!');
      } catch (err) {
        alert('Failed to delete outlet.');
      }
    }
  };

  const confirmDelete = (outlet: Outlet) => {
    setOutletToDelete(outlet);
    setShowDeleteModal(true); // Tampilkan modal konfirmasi
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Tutup modal konfirmasi tanpa penghapusan
    setOutletToDelete(null);
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="p-5 font-sans min-h-screen"
      style={{
        backgroundImage:
          "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg'), url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Outlets</h1>

      {/* Dashboard Button */}
      <div className="flex justify-center mb-8">
        <Link
          href="/admin"
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full max-w-md bg-white bg-opacity-90"
        />
      </div>

      {/* Outlets Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredOutlets.map((outlet) => (
          <div
            key={outlet.id}
            className="block p-6 border border-gray-200 rounded-lg shadow-md bg-white bg-opacity-75 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {outlet.name}
              </h2>
              <p className="text-gray-600">Email: {outlet.email}</p>
              <p className="text-gray-600">
                Created At: {new Date(outlet.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4 mt-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEditClick(outlet)}
                className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                onClick={() => confirmDelete(outlet)}
                className="p-2 ml-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredOutlets.length === 0 && (
          <p className="text-center text-gray-500 w-full">No outlets found</p>
        )}
      </div>

      {/* Modal Popup for Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this outlet?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="p-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Update Outlet - Modal Popup */}
      {editingOutlet && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-120">
            <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">
              Update Outlet
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full bg-white p-2 border rounded mt-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full bg-white p-2 border rounded mt-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="w-full bg-white p-2 border rounded mt-2"
                />
              </div>
              <AddressComp outletId={editingOutlet.id} />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleUpdate}
                  className="p-2 bg-blue-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingOutlet(null)}
                  className="p-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutletsPage;
