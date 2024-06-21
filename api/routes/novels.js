import express from 'express';
import { getNovels, getNovel, addNovel, deleteNovel, updateNovel } from '../controllers/novelController.js';

const router = express.Router();

router.get('/', getNovels);
router.get('/:id', getNovel);
router.post('/', addNovel);
router.delete('/:id', deleteNovel);
router.put('/:id', updateNovel);


export default router;