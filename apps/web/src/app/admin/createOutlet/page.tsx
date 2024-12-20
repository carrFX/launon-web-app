'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function CreateOutlet() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/outlet',
        formData,
      );
      setMessage('Outlet created successfully!');
      setFormData({
        name: '',
        password: '',
        email: '',
      });
    } catch (error) {
      setMessage('Failed to create outlet. Please try again.');
      console.error(error);
    }
  };

  return (
    <div
      className="flex items-start justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://keranji.id/storage/artikel/content/828-Desain-Toko-Laundry-Minimalis-4.jpg')",
      }}
    >
      {/* Form placed near the top with margin-top */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-lg w-full mt-12">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create Outlet
        </h1>
        {message && (
          <p className="mb-4 text-center text-green-600">{message}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-6 rounded shadow"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-gray-800"
              required
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Outlet
            </button>
            <Link href="http://localhost:3000/admin">
              <button
                type="button"
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
