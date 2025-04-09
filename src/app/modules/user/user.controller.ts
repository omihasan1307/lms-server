/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { loginUser } from './auth.service';

const createUser = async (req: Request, res: Response) => {
  const { password, username, role } = req.body;
  const user = await UserServices.createUser(password, { username, role });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: error.message,
      data: undefined,
    });
  }
};

export const UserControllers = {
  createUser,
  login,
};

// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { UserServices } from './user.service';

// const createStudent = catchAsync(async (req, res) => {
//   const { password, student: studentData } = req.body;

//   const result = await UserServices.createStudentIntoDB(password, studentData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is created succesfully',
//     data: result,
//   });
// });

// const createFaculty = catchAsync(async (req, res) => {
//   const { password, faculty: facultyData } = req.body;

//   const result = await UserServices.createFacultyIntoDB(password, facultyData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is created succesfully',
//     data: result,
//   });
// });

// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body;

//   const result = await UserServices.createAdminIntoDB(password, adminData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created succesfully',
//     data: result,
//   });
// });

// export const UserControllers = {
//   createStudent,
//   createFaculty,
//   createAdmin,
// };
