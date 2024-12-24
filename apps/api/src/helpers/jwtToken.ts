import jwt from "jsonwebtoken";

export interface IPayload {
  id: string;
  email: string;
  role: string;
}

export const generateAccessToken = async (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

export const generateRefreshToken = async (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
export const verifyRefreshToken = async (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
}