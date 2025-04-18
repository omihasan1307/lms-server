import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true }, // Internal generated ID like U-0001
    username: { type: String, required: true, unique: true }, // For login
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// const userSchema = new Schema<TUser>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     needsPasswordChange: {
//       type: Boolean,
//       default: true,
//     },
//     role: {
//       type: String,
//       enum: ['student', 'faculty', 'admin'],
//     },
//     status: {
//       type: String,
//       enum: ['in-progress', 'blocked'],
//       default: 'in-progress',
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser>('User', userSchema);
