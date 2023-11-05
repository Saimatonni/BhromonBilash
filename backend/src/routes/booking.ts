import { cancelBooking, getBookings, makeBooking} from "../controllers/booking"
import express from "express"

const router = express.Router()

router.post('/',makeBooking)
router.get('/',getBookings)
router.delete('/',cancelBooking)


export default router