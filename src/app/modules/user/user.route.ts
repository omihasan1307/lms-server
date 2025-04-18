import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.post('/login', UserControllers.login);

export const UserRoutes = router;
