import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validatePostTourRating = {
  body: Joi.object({
    tourId: Joi.string()
      .required()
      .trim()
      .pattern(patterns.ID)
      .messages(errorMessage("Tour id in body")),
    bookingId: Joi.string()
      .required()
      .trim()
      .pattern(patterns.ID)
      .messages(errorMessage("Booking id in body")),
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages(errorMessage("Rating in body")),
    review: Joi.string().trim().messages(errorMessage("Review in body")),
  }),
};

export const validatePostHotelRating = {
  body: Joi.object({
    hotelId: Joi.string()
      .required()
      .trim()
      .pattern(patterns.ID)
      .messages(errorMessage("Tour id in body")),
    bookingId: Joi.string()
      .required()
      .trim()
      .pattern(patterns.ID)
      .messages(errorMessage("Booking id in body")),
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages(errorMessage("Rating in body")),
    review: Joi.string().trim().messages(errorMessage("Review in body")),
  }),
  query: Joi.object({
    budgetType: Joi.string()
      .trim()
      .required()
      .pattern(patterns.isValidBudgetType)
      .messages(errorMessage("budgetType in query param")),
  }),
};
