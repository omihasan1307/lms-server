import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';
import config from '../config';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError(401, 'Unauthorized');

    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      role: string;
    };
    if (decoded.role !== 'admin')
      throw new AppError(403, 'Access denied. Admins only');

    next();
  } catch (err) {
    next(err);
  }
};
