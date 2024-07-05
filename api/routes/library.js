import express from 'express';
import { addNovelToUserLibrary, getUserLibrary } from '../controllers/libraryController.js';

const router = express.Router()

router.get('/:id', getUserLibrary)
router.post('/', addNovelToUserLibrary)

export default router