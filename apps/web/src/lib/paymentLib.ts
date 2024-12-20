import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createPaymentFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/payment/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};