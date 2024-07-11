import express from 'express';
import novelRoutes from './novels.js';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import chapterRoutes from './chapter.js';
import libraryRoutes from './library.js';
import reviewRoutes from './review.js';

const router = express.Router();

router.use('/series', novelRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/', chapterRoutes)
router.use('/library', libraryRoutes)
router.use('/', reviewRoutes)

export default router;