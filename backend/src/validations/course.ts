import { Joi } from "express-validation";
import patterns from "../utils/patterns";
import { errorMessage } from "../utils/helper";

export const validateCourseEnrollment = {
  body: Joi.object({
    courseId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Course Id")),
  }),
};

export const validateCourse = {
  query: Joi.object({
    courseId: Joi.string()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Course Id")),
    categoryId: Joi.string()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Category Id")),
  }),
};

export const validateCourseEnrollmentUpdate = {
  body: Joi.object({
    lessonId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Lesson Id")),
    courseId: Joi.string()
      .required()
      .trim()
      .regex(patterns.ID)
      .messages(errorMessage("Course Id")),
  }),
};
