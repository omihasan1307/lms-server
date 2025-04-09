/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';

export const CourseController = {
  createCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourse(
      req.body,
      req.file!,
      req.user,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  }),

  getCourses: catchAsync(async (req: Request, res: Response) => {
    const { title } = req.query;

    const filters: any = {};

    if (title) {
      filters.title = { $regex: title, $options: 'i' };
    }

    const result = await CourseService.getAllCourses(filters);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  }),

  getSingleCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getSingleCourse(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrieved successfully',
      data: result,
    });
  }),

  updateCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.updateCourse(
      req.params.id,
      req.body,
      req.user,
      req.file,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  }),

  deleteCourse: catchAsync(async (req: Request, res: Response) => {
    await CourseService.deleteCourse(req.params.id, req.user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course deleted successfully',
      data: undefined,
    });
  }),
};
