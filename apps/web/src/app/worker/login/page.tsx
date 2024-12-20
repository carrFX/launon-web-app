'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginWorker() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isOutletAdmin, setIsOutletAdmin] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setMessage('');

    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

    const loginUrl = isOutletAdmin
      ? `${BACKEND_URL}/api/outlet/login`
      : `${BACKEND_URL}/api/worker/login`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage('Login successful');

        localStorage.setItem(
          isOutletAdmin ? 'outletAdmin' : 'outletWorker',
          JSON.stringify(isOutletAdmin ? data : data.outletWorker),
        );

        router.push(isOutletAdmin ? '/outlets/dashboard' : '/worker/dashboard');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        {message && (
          <p className="mb-4 text-center text-green-600">{message}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-slate-300 bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-white border border-slate-300"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isOutletAdmin"
              checked={isOutletAdmin}
              onChange={(e) => setIsOutletAdmin(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isOutletAdmin" className="text-sm">
              Login as Outlet Admin
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
