import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  try {
    if (!token) throw 'Access token required'
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ status: 403,message: 'Invalid token' });
  }
};
