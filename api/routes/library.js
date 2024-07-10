import express from 'express';
import { addNovelToUserLibrary, deleteNovelFromUserLibrary, getUserLibrary } from '../controllers/libraryController.js';
import { verifyToken, verifyUserAccess } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/:id', getUserLibrary)
router.post('/', verifyToken, addNovelToUserLibrary)
router.delete('/:userId/:novelId', verifyUserAccess, deleteNovelFromUserLibrary)

export default router