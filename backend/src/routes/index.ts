import express from 'express';

// Route list
import tourRouter from "./tour"
import hotelRouter from "./hotel"
import roomRouter from "./room"
import travelRouter from "./travel"
import bookingRouter from "./booking"
import authenticationRouter from "./authentication"
import ratingRouter from "./rating"
import subscriptionRouter from './subscription'

const router = express.Router();

router.use('/tour',tourRouter)
router.use('/hotel',hotelRouter)
router.use('/room',roomRouter)
router.use('/travel',travelRouter)
router.use('/booking',bookingRouter)
router.use('/auth',authenticationRouter)
router.use('/rating',ratingRouter)
router.use('/subscription',subscriptionRouter)


export default router;
