import { authenticateUserJWTToken } from "../middleware/authentication"
import { cancelBooking, getBookings, makeBooking} from "../controllers/booking"
import express from "express"
import { validate } from "express-validation"
import { validateMakeBooking } from "../validations/booking"

const router = express.Router()

router.post('/',authenticateUserJWTToken(),validate(validateMakeBooking),makeBooking)
router.get('/',getBookings)
router.delete('/',cancelBooking)


export default router