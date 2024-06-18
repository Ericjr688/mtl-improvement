import express from 'express';
import novelRoutes from './novels.js';
import userRoutes from './users.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use('/series', novelRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;