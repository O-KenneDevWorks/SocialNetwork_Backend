import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtsRoutes from './thoughtsRoutes.js'

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

export default router;
