import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateMakeBooking = {
  query: Joi.object({
    budgetType: Joi.string()
      .required()
      .trim()
      .pattern(patterns.isValidBudgetType)
      .messages(errorMessage("Budget Type in query param")),
  }),
  body: Joi.object({
    tourId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Tour id in body")),
    hotelId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Hotel id in body")),
    budgetType: Joi.string()
      .required()
      .trim()
      .pattern(patterns.isValidBudgetType)
      .messages(errorMessage("Budget Type id in body")),
    tourGuide: Joi.boolean()
      .required()
      .messages(errorMessage("Tour guide in body")),
    uptrip: Joi.object({
      source: Joi.string()
        .required()
        .trim()
        .messages(errorMessage("source in uptrip")),
      time: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidTime)
        .messages(errorMessage("time array in uptrip")),
      totalPersons: Joi.number()
        .required()
        .min(1)
        .messages(errorMessage("total persons in uptrip")),
      date: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidDate)
        .messages(errorMessage("Date in uptrip")),
      travelId: Joi.string()
        .trim()
        .required()
        .pattern(patterns.ID)
        .messages(errorMessage("travel id in uptrip")),
    }),
    downtrip: Joi.object({
      source: Joi.string()
        .required()
        .trim()
        .messages(errorMessage("source in downtrip")),
      time: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidTime)
        .messages(errorMessage("time in downtrip")),
      totalPersons: Joi.number()
        .required()
        .min(1)
        .messages(errorMessage("total persons in downtrip")),
      date: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidDate)
        .messages(errorMessage("Date in downtrip")),
      travelId: Joi.string()
        .trim()
        .required()
        .pattern(patterns.ID)
        .messages(errorMessage("travel id in downtrip")),
    }),
    singleBedRoomIds: Joi.array()
      .items(Joi.string().pattern(patterns.isValidId))
      .messages(errorMessage("Single bed room ids in body")),

    doubleBedRoomIds: Joi.array()
      .items(Joi.string().pattern(patterns.isValidId))
      .messages(errorMessage("Double bed room ids in body")),
    bookingDates: Joi.object({
      start: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidDate)
        .messages(errorMessage("start in booking dates")),
      end: Joi.string()
        .trim()
        .required()
        .pattern(patterns.isValidDate)
        .messages(errorMessage("end in booking dates")),
    }),
  }),
};
