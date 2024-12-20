import dotenv from "dotenv";
dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const mailResetPassFetchDb = async (data: any) => {
    const res = await fetch(`${BASE_URL}/mail/send-reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return { result, ok: res.ok };
};
export const mailUpdateEmailFetchDb = async (data: any) => { // email
    const res = await fetch(`${BASE_URL}/mail/send-update-mail`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return { result, ok: res.ok };
};
export const mailOnlyVerifyFetchDb = async (data: any) => { // email
    const res = await fetch(`${BASE_URL}/mail/send-only-verify`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return { result, ok: res.ok };
};