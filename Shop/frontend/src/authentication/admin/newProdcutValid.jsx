import Joi from "joi";

export const productValidationSchema = Joi.object({
    category:Joi.allow(""),
    title: Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/).required().messages({
        'string.min': 'Title must be at least {#limit} characters long',
        'string.max': 'Title must not exceed {#limit} characters',
        'string.pattern.base': 'Title must contain only letters',
        'any.required': 'Title is required',
    }),
    description: Joi.string().min(15).max(150).required().messages({
        'string.min': 'Description must be at least {#limit} characters long',
        'string.max': 'Description must not exceed {#limit} characters',
        'any.required': 'Description is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required',
    }),
        calories: Joi.number().positive().required(),
        carbohydrates: Joi.number().positive().required(),
        protein: Joi.number().positive().required(),
        fat: Joi.number().positive().required(),
    imgUrl: Joi.string().min(15).max(500).required().messages({
        'string.empty': 'Image URL must not be empty',
        'any.required': 'Image URL is required',
    }),
    imgAlt: Joi.string().min(2).max(25).required().messages({
        'string.empty': 'Image Alt must not be empty',
        'any.required': 'Image Alt is required',
    }),
    sale: Joi.boolean(),
    unit: Joi.allow(""),

});

