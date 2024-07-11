import express from 'express'
import { getReviewsForNovel } from '../controllers/reviewController.js'

const router = express.Router()

router.get('/series/:novelId/reviews', getReviewsForNovel)

export default router