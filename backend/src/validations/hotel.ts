import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateGetHotels = {
  query: Joi.object({
    budgetType: Joi.string()
      .required()
      .trim()
      .pattern(patterns.isValidBudgetType)
      .messages(errorMessage("Budget Type in query params")),
    tourId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("TourId in query param")),
  }),
};

export const validateGetHotelById = {
  query: Joi.object({
    budgetType: Joi.string()
      .required()
      .trim()
      .pattern(patterns.isValidBudgetType)
      .messages(errorMessage("Budget Type in query params")),
    hotelId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("HotelId in query param")),
  }),
};
