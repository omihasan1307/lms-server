import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.post('/login', UserControllers.login);

export const UserRoutes = router;

// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { createAdminValidationSchema } from '../Admin/admin.validation';
// import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
// import { createStudentValidationSchema } from './../student/student.validation';
// import { UserControllers } from './user.controller';

// const router = express.Router();

// router.post(
//   '/create-student',
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );

// router.post(
//   '/create-faculty',
//   validateRequest(createFacultyValidationSchema),
//   UserControllers.createFaculty,
// );

// router.post(
//   '/create-admin',
//   validateRequest(createAdminValidationSchema),
//   UserControllers.createAdmin,
// );

// export const UserRoutes = router;
