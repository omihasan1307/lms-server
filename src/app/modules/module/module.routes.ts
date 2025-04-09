import express from 'express';
import { ModuleController } from './module.controller';
import { auth } from '../../middlewares/auth';
import { requireAdmin } from '../../middlewares/requireAdmin';

const router = express.Router();

router.post('/', auth, requireAdmin, ModuleController.createModule);
router.get('/', ModuleController.getModules);
router.get('/:id', auth, ModuleController.getSingleModule);
router.patch('/:id', auth, requireAdmin, ModuleController.updateModule);
router.delete('/:id', auth, requireAdmin, ModuleController.deleteModule);

export const ModuleRoutes = router;
