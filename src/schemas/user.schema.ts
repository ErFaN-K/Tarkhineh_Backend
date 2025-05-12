import Joi from 'joi';

export const createUserSchema = Joi.object({
  phoneNumber: Joi.string()
    .trim()
    .regex(/^0\d{9}/) // Ensuring phone number starts with '0' and is exactly 10 digits
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base': 'Phone number must be exactly 11 digits',
      'any.required': 'Phone number is required',
    }),

  firstName: Joi.string().trim().required().messages({
    'any.required': 'First name is required',
  }),

  lastName: Joi.string().trim().required().messages({
    'any.required': 'Last name is required',
  }),
});

export const updateUserSchema = Joi.object({
  phoneNumber: Joi.string()
    .trim()
    .optional()
    .regex(/^0\d{10}$/) // Ensuring phone number starts with '0' and is exactly 10 digits
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'any.required': 'Phone number is required',
    }),

  firstName: Joi.string().trim().optional().messages({
    'any.required': 'First name is required',
  }),

  lastName: Joi.string().trim().optional().messages({
    'any.required': 'Last name is required',
  }),

  email: Joi.string()
    .email() // Validate the email format
    .trim()
    .optional()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),

  displayName: Joi.string().trim().optional().messages({
    'string.base': 'Display name must be a string',
  }),

  birthDate: Joi.date().optional().messages({
    'date.base': 'Birthdate must be a valid date',
  }),

  userProfile: Joi.string().uri().optional().messages({
    'string.base': 'User profile must be a string',
    'string.uri': 'User profile must be a valid URL (if provided)',
  }),

  userRole: Joi.string().valid('admin', 'user').optional().messages({
    'string.base': 'User role must be a string',
    'any.only': 'User role must be either "admin" or "user"',
  }),
});
