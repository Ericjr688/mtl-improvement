import { getChaptersForNovel, getChapter, getRecentChapters } from "../controllers/chapterController.js";
import express from 'express';

const router = express.Router()

router.get('/chapters/recent', getRecentChapters);
router.get('/series/:novelId/chapters', getChaptersForNovel)
router.get('/chapters/:chapterId', getChapter)


export default router;