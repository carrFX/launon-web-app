import { IPrimaryAddress } from '@/type/customerType';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createAddressFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/address/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const getAddresByUserIdFetchDb = async (id: number) => {
  const res = await fetch(`${BASE_URL}/address/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const getAddresByOutletIdFetchDb = async (id: number) => {
  const res = await fetch(`${BASE_URL}/address/outlet/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const getAddressByIdFetchDb = async (id: number) => {
  const res = await fetch(`${BASE_URL}/address/id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const updateAddressFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/address/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const deleteAddressFetchDb = async (id: number) => {
  const res = await fetch(`${BASE_URL}/address/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const setPrimaryAddressFetchDb = async (data: IPrimaryAddress) => {
  const res = await fetch(`${BASE_URL}/address/set-main`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const getAllOutletAddressFetchDb = async (page: number) => {
  const res = await fetch(`${BASE_URL}/address/outlets/outlet?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return { result, ok: res.ok };
};
