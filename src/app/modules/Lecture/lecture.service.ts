/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lecture } from './lecture.model';
import { ILecture } from './lecture.interface';
import AppError from '../../errors/AppError';
import { Module } from '../module/module.model';

const createLecture = async (
  moduleId: string,
  title: string,
  videoUrl: string,
  pdfNotes: string[],
): Promise<ILecture> => {
  const module = await Module.findById(moduleId);
  if (!module) {
    throw new AppError(404, 'Module not found');
  }

  return await Lecture.create({
    title,
    videoUrl,
    pdfNotes,
    module: moduleId,
  });
};

const getLectures = async (filters: any) => {
  return await Lecture.find(filters)
    .populate({
      path: 'module',
      select: 'title', // Only essential fields
      populate: {
        path: 'course',
        select: 'title', // Don't populate lectures here
      },
    })
    .limit(10); // Critical: Add limit
};

const getSingleLecture = async (id: string) => {
  const lecture = await Lecture.findById(id).populate({
    path: 'module',
    populate: {
      path: 'course',
    },
  });

  if (!lecture) {
    throw new AppError(404, 'Lecture not found');
  }

  return lecture;
};

const getLecturesByCourse = async (courseId: string): Promise<ILecture[]> => {
  const modules = await Module.find({ course: courseId });
  const lectures = await Lecture.find({
    module: { $in: modules.map((m) => m._id) },
  }).populate('module');
  if (!lectures || lectures.length === 0) {
    throw new AppError(404, 'No lectures found');
  }
  return lectures;
};

const updateLecture = async (
  id: string,
  title: string,
  videoUrl: string,
  pdfNotes: string[],
): Promise<ILecture | null> => {
  const updatedLecture = await Lecture.findByIdAndUpdate(
    id,
    { title, videoUrl, pdfNotes },
    { new: true },
  );
  return updatedLecture;
};

const deleteLecture = async (id: string): Promise<void> => {
  const lecture = await Lecture.findById(id);
  if (!lecture) throw new AppError(404, 'Lecture not found');
  await Lecture.findByIdAndDelete(id);
};

export const LectureService = {
  createLecture,
  getLectures,
  getSingleLecture,
  getLecturesByCourse,
  updateLecture,
  deleteLecture,
};
