const Joi = require('joi');

const productValidationSchema = Joi.object({
  category: Joi.string().min(2).max(30).required().messages({
    'string.min': 'category must be at least {#limit} characters long',
    'string.max': 'category must not exceed {#limit} characters',
    'string.empty': 'category must not be empty',
  }),
    title: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Title must be at least {#limit} characters long',
      'string.max': 'Title must not exceed {#limit} characters',
      'any.required': 'Title is required',
    }),
    description: Joi.string().min(2).max(150).required().messages({
      'string.min': 'Description must be at least {#limit} characters long',
      'string.max': 'Description must not exceed {#limit} characters',
      'any.required': 'Description is required',
    }),
    price: Joi.number().positive().required().messages({
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required',
    }),
  nutritionalValue: Joi.object({
    calories: Joi.number().positive().required(),
    carbohydrates: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    fat: Joi.number().positive().required(),
  }).required(),
  img: Joi.object({
    url: Joi.string(), 
    alt: Joi.string(),
  }).required(),
  sale:Joi.boolean(),
 
});

module.exports = productValidationSchema;
