import fsPromises from 'fs/promises';
import { sign } from 'jsonwebtoken';
import constVariable from './constVariable';

/**
 * Generate custom joi message
  @param {string} field pass the field name which we validate
 */
export const errorMessage = (field: string, message = null, min = null, max = null) => {
  return {
    'string.base': message ? `${field} ${message}` : `${field} must be a string.`,
    'string.pattern.base': message ? `${field} ${message}` : `${field} invalid.`,
    'string.empty': message ? `${field} ${message}` : `${field} can't be blank.`,
    'any.required': message ? `${field} ${message}` : `${field} can't be blank.`,
    'string.alphanum': message ? `${field} ${message}` : `${field} must only contain alpha-numeric characters.`,
    'number.max': message ? `${field} ${message}` : `${field} must be less than or equal to ${max}.`,
    'number.min': message ? `${field} ${message}` : `${field} must be greater than or equal to ${min}.`,
    'number.base': message ? `${field} ${message}` : `${field} must be a number.`,
    'array.base': message ? `${field} ${message}` : `${field} must be an array.`,
    'any.only': message ? `${field} ${message}` : `${field} is not included in list.`,
    'array.length': message ? `${field} ${message}` : `${field} must contains items.`,
    'string.email': message ? `${field} ${message}` : `${field} must be valid.`,
    'array.sparse': message ? `${field} ${message}` : `${field} must not be a sparse array item.`,
    'array.includesRequiredUnknowns': message ? `${field} ${message}` : `${field} required parameter missing.`,
    'date.greater': message ? `${field} ${message}` : `${field} must be greater than ${new Date().toISOString()}`,
    'date.max': message ? `${field} ${message}` : `${field} invalid .`,
    'number.integer': message ? `${field} ${message}` : `${field} must be an integer.`,
    'date.base': message ? `${field} ${message}` : `${field} please enter valid date.`,
    'string.max': message
      ? `${field} ${message}`
      : `${field} length must be less than or equal to ${max} characters long.`,
    'string.min': message
      ? `${field} ${message}`
      : `${field} length must be greater than or equal to ${min} characters long.`
  };
};

/**
 * Remove fields from response object
 * @param {any} obj Response of the API
 * @param {Array} keys List of keys that you want to remove from response
 * @param {boolean} defaultFields Remove the default field from response
 */
export const removeFields = (obj: any, keys: string[] = [], defaultFields: boolean = true) => {
  const basicFields = ['createdAt', 'deletedAt', 'updatedAt', 'deletedBy', '__v'];
  let isObject = false;
  if (!(obj instanceof Array)) isObject = true;

  obj = obj instanceof Array ? obj : [obj];

  if (defaultFields) keys = [...keys, ...basicFields];

  obj.forEach((data: any) => {
    keys.forEach((key: string) => {
      // if (data.dataValues) delete data.dataValues[key];
      delete data[key];
    });
  });

  if (isObject) return obj[0];
  return obj;
};

/**
 *
 * @param {object} payload
 * @returns {object}
 */
export const toObject = (payload: object) => JSON.parse(JSON.stringify(payload));

/**
 * Send response for API
 * @param {string} resMessage Response message of the API
 * @param {Array | Object} response Response data
 * @param {Number} pages Number of pages
 * @param {Number} total Total record count
 */
export const getSuccessResponse = (
  resMessage: string,
  response: any = null,
  pages: number | null = null,
  total: number | null = null
) => {
  const result: {
    success: boolean;
    message: string;
    data: Record<string, unknown> | Array<Record<string, unknown>>;
    pages?: number;
    total?: number;
  } = {
    success: true,
    message: resMessage,
    data: response
  };
  if (pages) result.pages = pages;
  if (total) result.total = total;
  return result;
};

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
// export const generateJWT = (user, expiredTime = constVariable.JWT_TOKEN_EXPIRY_TIME) => {
//   return sign(toObject(user), process.env.JWT_SECRET, { expiresIn: expiredTime });
// };

export const excludeFields = (extraFields = {}) => {
  return {
    deletedAt: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    ...extraFields
  };
};

export const generateUniqueSuffix = () => {
  return `${Date.now()} - ${Math.round(Math.random() * 1e9)}`;
};

export const deleteFiles = (filePath) => {
  try {
    filePath.forEach(async (path) => {
      try {
        if (path) await fsPromises.unlink(`./src/public/${path}`);
      } catch (error) {
        // console.log(err);
      }
    });
  } catch (err) {
    // console.log(err);
  }
};

export const UnauthorizedError = (message: string) => {
  return {
    status: 401,
    message
  };
};

export const NotFoundError = (message: string) => {
  return {
    status: constVariable.HTTP_CODE.NOT_FOUND,
    message
  };
};

export const AccessDeniedError = (message: string) => {
  return {
    status: constVariable.HTTP_CODE.UNAUTHORIZED,
    message
  };
};

export const ValidationError = (message: string) => {
  return {
    status: constVariable.HTTP_CODE.UNPROCESSABLE_ENTITY,
    message
  };
};
