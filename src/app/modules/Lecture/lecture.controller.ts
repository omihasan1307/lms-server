/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Request, Response } from 'express';
import { LectureService } from './lecture.service';
import sendResponse from '../../utils/sendResponse';
import { uploadPdfToCloudinary } from '../../middlewares/uploadFiles';
import { Lecture } from './lecture.model';

// Create a new lecture under a specific module
const createLecture = async (req: Request, res: Response) => {
  const { title, videoUrl, moduleId } = req.body;
  const pdfUrls: string[] = [];

  for (const file of req.files as Express.Multer.File[]) {
    const url = await uploadPdfToCloudinary(file.path);
    pdfUrls.push(url);
  }

  const existingLecture = await Lecture.findOne({ title, module: moduleId });
  if (existingLecture) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Title Already exists',
      data: undefined,
    });
  }

  const lecture = await LectureService.createLecture(
    moduleId,
    title,
    videoUrl,
    pdfUrls,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Lecture created successfully',
    data: lecture,
  });
};

const getLectures = async (req: Request, res: Response) => {
  const { courseId, moduleId } = req.query;

  const filters: any = {};

  if (courseId) {
    filters['course'] = courseId;
  }

  if (moduleId) {
    filters['module'] = moduleId;
  }
  res.set('Cache-Control', 'public, max-age=60');
  const lectures = await LectureService.getLectures(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lectures fetched successfully',
    data: lectures,
  });
};

const getSingleLecture = async (req: Request, res: Response) => {
  const { id } = req.params;

  const lecture = await LectureService.getSingleLecture(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single lecture fetched successfully',
    data: lecture,
  });
};

// Get all lectures for a specific course
const getLecturesByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const lectures = await LectureService.getLecturesByCourse(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lectures fetched successfully',
    data: lectures,
  });
};

// Update a lecture
const updateLecture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, videoUrl, pdfNotes } = req.body;

  const updatedLecture = await LectureService.updateLecture(
    id,
    title,
    videoUrl,
    pdfNotes,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lecture updated successfully',
    data: updatedLecture,
  });
};

// Delete a lecture
const deleteLecture = async (req: Request, res: Response) => {
  const { id } = req.params;

  await LectureService.deleteLecture(id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Lecture deleted successfully',
    data: null,
  });
};

export const LectureController = {
  createLecture,
  getLectures,
  getSingleLecture,
  getLecturesByCourse,
  updateLecture,
  deleteLecture,
};
