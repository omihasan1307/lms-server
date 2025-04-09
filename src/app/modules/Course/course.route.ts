import express from 'express';
import { requireAdmin } from '../../middlewares/requireAdmin';
import { CourseController } from './course.controller';
import { auth } from '../../middlewares/auth';
import { thumbnailUpload } from '../../middlewares/upload';

const router = express.Router();

router.get('/', CourseController.getCourses);
router.get('/:id', CourseController.getSingleCourse);
router.post(
  '/',
  auth,
  thumbnailUpload.single('thumbnail'),
  requireAdmin,
  CourseController.createCourse,
);
router.patch(
  '/:id',
  auth,
  requireAdmin,
  thumbnailUpload.single('thumbnail'),
  CourseController.updateCourse,
);
router.delete('/:id', auth, requireAdmin, CourseController.deleteCourse);

export const CourseRoutes = router;
