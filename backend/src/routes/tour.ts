import express from "express";

import { getAllTours, getTour, makeTour } from "../controllers/tour";
import { validate } from "express-validation";
import { validateGetTour } from "../validations/tour";

const router = express.Router();

router.get("/",validate(validateGetTour),getTour);

router.get("/all",getAllTours);

router.post("/",makeTour)

export default router;