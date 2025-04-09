/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from './module.model';
import { IModule } from './module.interface';
import AppError from '../../errors/AppError';
import { Course } from '../Course/course.model';

// Create Module
const createModule = async (
  courseId: string,
  title: string,
  user: any,
): Promise<IModule> => {
  const course = await Course.findById(courseId);

  if (user.role !== 'admin') {
    throw new AppError(403, 'Only admin can create modules');
  }

  if (!course) {
    throw new AppError(404, 'Course not found');
  }

  const moduleCount = await Module.countDocuments({ course: courseId });
  const newModule = await Module.create({
    title,
    moduleNumber: moduleCount + 1,
    course: courseId, // Store just the ObjectId
  });

  await Course.findByIdAndUpdate(courseId, {
    $push: { modules: newModule._id },
  });

  const populatedModule = await Module.findById(newModule._id)
    .populate('course')
    .populate('lectures');

  return populatedModule as IModule;
};

const getModules = async (filters: any): Promise<IModule[]> => {
  const modules = await Module.find(filters)
    .populate({
      path: 'course',
      select: 'title description thumbnail price', // Select specific fields
    })
    .populate({
      path: 'lectures',
      select: 'title duration videoUrl', // Select specific fields
    });

  if (!modules || modules.length === 0) {
    throw new AppError(404, 'No modules found');
  }

  return modules;
};

const getModuleById = async (id: string): Promise<IModule | null> => {
  const module = await Module.findById(id)
    .populate({
      path: 'course',
      select: 'title description thumbnail price instructor', // Customize fields
    })
    .populate({
      path: 'lectures',
      select: 'title duration isCompleted isLocked', // Customize fields
      options: { sort: { createdAt: 1 } }, // Sort lectures
    });

  if (!module) {
    throw new AppError(404, 'Module not found');
  }

  return module;
};
// Update Module
const updateModule = async (
  id: string,
  title: string,
): Promise<IModule | null> => {
  const updatedModule = await Module.findByIdAndUpdate(
    id,
    { title },
    { new: true },
  );
  return updatedModule;
};

// Delete Module
const deleteModule = async (id: string, user: any): Promise<void> => {
  const module = await Module.findById(id);
  if (!module) throw new AppError(404, 'Module not found');
  if (user.role !== 'admin') {
    throw new AppError(403, 'Unauthorized to delete this course');
  }
  await Module.findByIdAndDelete(id);
};

export const ModuleService = {
  createModule,
  getModules,
  updateModule,
  deleteModule,
  getModuleById,
};
