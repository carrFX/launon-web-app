// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Outlet } from '@/type/outlet';
// import { useParams, useRouter } from 'next/navigation';

// const UpdateOutletPage = () => {
//   const { id } = useParams(); // Get the ID from the URL
//   const router = useRouter();

//   const [outlet, setOutlet] = useState({
//     name: '',
//     password: '',
//     email: '',
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchOutlet = async () => {
//       try {
//         const response = await axios.get<Outlet>(
//           `http://localhost:8000/api/outlet/id/${id}`,
//         );
//         setOutlet({
//           name: response.data.name,
//           password: '', // Reset password for security
//           email: response.data.email,
//         });
//       } catch (err) {
//         setError('Failed to fetch outlet data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOutlet();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div
//       className="flex flex-col items-center justify-start p-5 min-h-screen"
//       style={{
//         backgroundImage:
//           "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-lg w-full mt-5">
//         <h1 className="text-2xl font-bold text-center mb-6">Update Outlet</h1>

//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               value={outlet.name}
//               onChange={(e) => setOutlet({ ...outlet, name: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
//               placeholder="Enter outlet name"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={outlet.email}
//               onChange={(e) => setOutlet({ ...outlet, email: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
//               placeholder="Enter outlet email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={outlet.password}
//               onChange={(e) =>
//                 setOutlet({ ...outlet, password: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
//               placeholder="Enter new password"
//             />
//           </div>

//           <div className="flex justify-center gap-4">
//             {/* Update Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {isSubmitting ? 'Updating...' : 'Update Outlet'}
//             </button>

//             {/* Back Button */}
//             <button
//               type="button"
//               onClick={() =>
//                 router.push('http://localhost:3000/admin/viewOutlet')
//               }
//               className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateOutletPage;
