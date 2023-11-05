import { makeACTravel, makeNonACTravel, makeSpecialACTravel } from "../controllers/travel"
import express from "express"

const router = express.Router()

router.post("/nonAC",makeNonACTravel)
router.post("/AC",makeACTravel)
router.post("/specialAC",makeSpecialACTravel)

export default router