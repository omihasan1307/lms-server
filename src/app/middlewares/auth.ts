// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(401, 'Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload & {
      userId: string;
      role: 'admin' | 'user';
    };

    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(401, 'Unauthorized: Invalid token');
  }
};
