import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateRegister = {
  body: Joi.object({
    name: Joi.string().required().trim().messages(errorMessage("name in body")),
    address: Joi.string()
      .required()
      .trim()
      .messages(errorMessage("address in body")),
    phone: Joi.string()
      .required()
      .trim()
      .pattern(patterns.isValidPhoneNumber)
      .messages(errorMessage("phone in body")),
    email: Joi.string()
      .email()
      .trim()
      .required()
      .pattern(patterns.isEmail)
      .messages(errorMessage("Email in body")),
    password: Joi.string()
      .trim()
      .required()
      .messages(errorMessage("Pasword in body")),
  }),
};

export const validateLogin = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .required()
      .pattern(patterns.isEmail)
      .messages(errorMessage("Email in body")),
    password: Joi.string()
      .trim()
      .required()
      .messages(errorMessage("Pasword in body")),
  }),
};


export const validateEmailVerification = {
    body: Joi.object({
      email: Joi.string()
        .email()
        .trim()
        .required()
        .pattern(patterns.isEmail)
        .messages(errorMessage("Email in body")),
      token: Joi.string()
        .trim()
        .required()
        .messages(errorMessage("Token in body")),
    }),
  };
  

  export const validateSendOtp = {
    body: Joi.object({
      email: Joi.string()
        .email()
        .trim()
        .required()
        .pattern(patterns.isEmail)
        .messages(errorMessage("Email in body")),
    }),
  };
  

  
export const validateForgetPassword = {
    body: Joi.object({
      email: Joi.string()
        .email()
        .trim()
        .required()
        .pattern(patterns.isEmail)
        .messages(errorMessage("Email in body")),
      token: Joi.string()
        .trim()
        .required()
        .messages(errorMessage("Token in body")),
    password : Joi.string()
        .trim()
        .required()
        .messages(errorMessage("Password in body")),
    }),
  };