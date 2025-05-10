import Joi from 'joi';

export const createUserSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'any.required': 'Phone number is required',
    }),
});