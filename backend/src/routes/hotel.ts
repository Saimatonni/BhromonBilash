import { validate } from "express-validation";
import { getHotelById, getHotels, makeFiveStarHotel, makeFourStarHotel, makeThreeStarHotel, pushDiscount } from "../controllers/hotel";
import express from "express";
import { validateGetHotelById, validateGetHotels } from "../validations/hotel";


const router = express.Router();

router.get("/all",validate(validateGetHotels),getHotels)
router.get("/",validate(validateGetHotelById),getHotelById)
router.put('/discount',pushDiscount)


//admin side routes
router.post("/threeStar",makeThreeStarHotel)
router.post("/fourStar",makeFourStarHotel)
router.post("/fiveStar",makeFiveStarHotel)


export default router;