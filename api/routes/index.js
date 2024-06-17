import express from 'express';
import novelRoutes from './novelRoutes.js';

const router = express.Router();

router.use('/series', novelRoutes);

export default router;