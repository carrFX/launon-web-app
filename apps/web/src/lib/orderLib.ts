import dotenv from "dotenv";
dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const requestOrderFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/order/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  return { result, ok: res.ok };
};
export const getOrderByIdFetchDb = async (id: number) => {
  const res = await fetch(`${BASE_URL}/order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  return { result, ok: res.ok };
}
export const getOrdersByUserFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/order/user/${data.id}?page=${data.currentPage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  return { result, ok: res.ok };
}

export const searchOrderFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/order/search`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  return { result, ok: res.ok };
};
export const confirmOrderFetchDb = async (data: any) => {
  const res = await fetch(`${BASE_URL}/order/confirm`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await res.json();
  return { result, ok: res.ok };
}