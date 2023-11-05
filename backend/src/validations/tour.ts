import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateGetTour = {
  query: Joi.object({
    tourId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("TourId in query param")),
  }),
};
