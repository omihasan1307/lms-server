/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ModuleService } from './module.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Module
const createModule = async (req: Request, res: Response) => {
  const { title, courseId } = req.body;

  if (!courseId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Course ID is required',
      data: undefined,
    });
  }

  const newModule = await ModuleService.createModule(courseId, title, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Module created successfully',
    data: newModule,
  });
};

// Get Modules by Course with optional filters

const getModules = async (req: Request, res: Response) => {
  const { courseId, title } = req.query;

  const filters: any = {};

  if (courseId) {
    filters.course = courseId;
  }

  if (title) {
    filters.title = { $regex: title, $options: 'i' };
  }
  res.set('Cache-Control', 'public, max-age=60');
  const modules = await ModuleService.getModules(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Modules fetched successfully',
    data: modules,
  });
};

const getSingleModule = async (req: Request, res: Response) => {
  const { id } = req.params;

  const module = await ModuleService.getModuleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module fetched successfully',
    data: module,
  });
};

// Update Module
const updateModule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const updatedModule = await ModuleService.updateModule(id, title);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module updated successfully',
    data: updatedModule,
  });
};

// Delete Module
const deleteModule = async (req: Request, res: Response) => {
  const { id } = req.params;

  await ModuleService.deleteModule(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module deleted successfully',
    data: undefined,
  });
};

export const ModuleController = {
  createModule,
  getModules,
  updateModule,
  deleteModule,
  getSingleModule,
};
