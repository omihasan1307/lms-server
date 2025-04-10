/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// src/app/modules/Course/course.service.ts

import { Course } from './course.model';
import { ICourse } from './course.interface';
import AppError from '../../errors/AppError';

import { uploadToCloudinary } from '../../utils/cloudinary.utils';

const createCourse = async (
  data: any,
  file: Express.Multer.File,
  user: any,
): Promise<ICourse> => {
  if (user.role !== 'admin') {
    throw new AppError(403, 'Only admin can create courses');
  }

  if (!file) {
    throw new AppError(400, 'Thumbnail image is required');
  }

  const cloudinaryResult = await uploadToCloudinary(file.path);

  const newCourse = await Course.create({
    title: data.title,
    price: data.price,
    description: data.description,
    thumbnail: cloudinaryResult.secure_url,
    createdBy: user?.userId,
  });

  return newCourse;
};

// course.service.ts
const getAllCourses = async (filters: any): Promise<ICourse[]> => {
  return await Course.find(filters)
    .select('title thumbnail price') // Only essential fields
    .populate({
      path: 'modules',
      select: 'title',
      options: { limit: 5 }, // Limit modules per course
      populate: {
        path: 'lectures',
        select: 'title',
        options: { limit: 3 }, // Limit lectures per module
      },
    })
    .limit(10); // Limit total courses
};
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  return await Course.findById(id).populate({
    path: 'modules',
    populate: {
      path: 'lectures',
    },
  });
};

const updateCourse = async (
  id: string,
  payload: Partial<ICourse>,
  user: any,
  file?: Express.Multer.File,
): Promise<ICourse | null> => {
  const existing = await Course.findById(id);
  if (!existing) throw new AppError(404, 'Course not found');

  if (user.role !== 'admin' || existing.createdBy !== user.userId) {
    throw new AppError(403, 'Unauthorized to update this course');
  }

  if (file) {
    const cloudinaryResult = await uploadToCloudinary(file.path);
    payload.thumbnail = cloudinaryResult.secure_url;
  }

  return Course.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCourse = async (id: string, user: any): Promise<void> => {
  const course = await Course.findById(id);
  if (!course) throw new AppError(404, 'Course not found');
  if (user.role !== 'admin' || course.createdBy !== user.userId) {
    throw new AppError(403, 'Unauthorized to delete this course');
  }

  await Course.findByIdAndDelete(id);
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
