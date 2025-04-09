/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';
import { generateUserId } from './user.utils';

const createUser = async (password: string, payload: Partial<IUser>) => {
  try {
    const userData: Partial<IUser> = {
      id: payload.id || (await generateUserId()),
      username: payload.username,
      password: password || config.default_password,
      role: payload.role || 'user',
    };

    if (!userData.username) {
      throw new AppError(400, 'Username is required');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    await session.commitTransaction();
    session.endSession();

    return newUser[0];
  } catch (err) {
    console.error('Error during user creation:', err); // Log the error
    throw new AppError(500, 'Internal Server Error');
  }
};

export const UserServices = {
  createUser,
};
