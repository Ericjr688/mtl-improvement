import express from 'express';
import { getAllNovels, getNovelById } from '../controllers/novelController.js';

const router = express.Router();

router.get('/', getAllNovels);
router.get('/:id', getNovelById);

export default router;