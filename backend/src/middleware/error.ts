/* eslint-disable no-console */
import { Request, NextFunction, Response } from 'express';
import { ValidationError } from 'express-validation';
import APIError from '../utils/APIError';

export const getErrorMessage = (error: any) => {
  error = error.details;
  if (error.params) return error.params[0].message;
  if (error.body) return error.body[0].message;
  if (error.query) return error.query[0].message;
};

export const handler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let message = err.message || 'Something went wrong. Please try again later.';
  if (!err.isPublic) {
    err.status = 500;
    message = 'Something went wrong. Please try again later.';
  }
  if (process.env.NODE_ENV === 'development') {
    if (err.stack) console.log(err.stack);
    if (err.errors) console.log(err.errors);
  }
  console.error(message, {
    error: err
  });
  return res.status(err.status).json({ success: false, message });
};

export const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedErr = err;

  if (err instanceof ValidationError) convertedErr = new APIError({ status: 422, message: getErrorMessage(err) });
  else if (!(err instanceof APIError))
    convertedErr = new APIError({ status: err.status, message: err.message, stack: err.stack });

  return handler(convertedErr, req, res, next);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({ message: 'Page not found', status: 404 });
  return handler(err, req, res, next);
};
