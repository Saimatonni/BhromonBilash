import { postHotelRatings, postTourRatings } from "../controllers/rating"
import express from "express"

const router = express.Router()

router.post('/tour',postTourRatings)
router.post('/hotel',postHotelRatings)

export default router