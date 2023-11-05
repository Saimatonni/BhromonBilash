import { makeDoubleBedFiveStar, makeDoubleBedFourStar, makeDoubleBedThreeStar, 
    makeSingleBedFiveStar, makeSingleBedFourStar, makeSingleBedThreeStar } from "../controllers/room"
import express from "express"

const router = express.Router()

router.post("/singleBedThreeStar",makeSingleBedThreeStar)
router.post("/singleBedFourStar",makeSingleBedFourStar)
router.post("/singleBedFiveStar",makeSingleBedFiveStar)
router.post("/doubleBedThreeStar",makeDoubleBedThreeStar)
router.post("/doubleBedFourStar",makeDoubleBedFourStar)
router.post("/doubleBedFiveStar",makeDoubleBedFiveStar)

export default router