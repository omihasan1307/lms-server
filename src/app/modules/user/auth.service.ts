import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import config from '../../config';

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new AppError(401, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect password');
  }

  // Ensure config values are properly typed
  if (!config.jwt_secret) {
    throw new AppError(500, 'JWT secret is not configured');
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwt_secret,
    { expiresIn: '1d' },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
};
