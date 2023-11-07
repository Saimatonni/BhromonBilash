import { authenticateUserJWTToken } from "../middleware/authentication"
import { postHotelRatings, postTourRatings } from "../controllers/rating"
import express from "express"
import { validate } from "express-validation"
import { validatePostHotelRating, validatePostTourRating } from "../validations/rating"

const router = express.Router()

router.post('/tour',authenticateUserJWTToken(),validate(validatePostTourRating),postTourRatings)
router.post('/hotel',authenticateUserJWTToken(),validate(validatePostHotelRating),postHotelRatings)

export default router