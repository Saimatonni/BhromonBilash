import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateChangePassword = {
  body: Joi.object({
    previousPassword : Joi.string()
      .required()
      .trim()
      .messages(errorMessage("Previous Password in body")),
    newPassword: Joi.string()
      .required()
      .trim()
      .messages(errorMessage("New Password in body")),
  }),
};


export const validateChangeProfile= {
    body: Joi.object({
      name : Joi.string()
        .trim()
        .messages(errorMessage("Name in body")),
      address: Joi.string()
        .trim()
        .messages(errorMessage("Address in body")),
    phone : Joi.string()
        .trim().pattern(patterns.isValidPhoneNumber)
        .messages(errorMessage("Phone in body")),
    imageData : Joi.string()
        .trim()
        .messages(errorMessage("Image Data in body")),
    }),
  };