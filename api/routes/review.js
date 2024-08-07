import express from 'express'
import { getReviewsForNovel, addReview, deleteReview } from '../controllers/reviewController.js'
import { verifyUserAccess, verifyUserOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/series/:novelId/reviews', getReviewsForNovel)
router.post('/reviews', verifyUserAccess, addReview)
router.delete('/reviews/:novelId/:userId', verifyUserOrAdmin, deleteReview)

export default router 