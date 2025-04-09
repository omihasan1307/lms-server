import express from 'express';
import { LectureController } from './lecture.controller';
import { auth } from '../../middlewares/auth';
import { requireAdmin } from '../../middlewares/requireAdmin';
import { uploadFiles } from '../../middlewares/uploadFiles';

const router = express.Router();

router.post(
  '/',
  auth,
  requireAdmin,
  uploadFiles,
  LectureController.createLecture,
);

router.get('/', LectureController.getLectures);

router.get('/:id', LectureController.getSingleLecture);

router.get('/course/:courseId', auth, LectureController.getLecturesByCourse);

router.patch('/:id', auth, requireAdmin, LectureController.updateLecture);

router.delete('/:id', auth, requireAdmin, LectureController.deleteLecture);

export const LectureRoutes = router;
