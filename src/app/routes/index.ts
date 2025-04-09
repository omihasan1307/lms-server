import { Router } from 'express';
import { CourseRoutes } from '../modules/Course/course.route';
import { UserRoutes } from '../modules/user/user.route';
import { ModuleRoutes } from '../modules/module/module.routes';
import { LectureRoutes } from '../modules/Lecture/lecture.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/lecture',
    route: LectureRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/modules',
    route: ModuleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
