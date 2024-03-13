import Joi from "joi";

export const checkoutSchema = Joi.object({
  cardHolder: Joi.string().required().pattern(/^[A-Za-z]+$/)
    .min(2).max(20).messages({
      'any.required': 'Card owner name is required.',
      'string.empty': 'name must not be empty.',
      'string.min': 'Owner Name Min 2 Letters.',
      'string.pattern.base': 'Name must contain only letters.',
    }),
  cardNumber: Joi.string().creditCard().required().messages({
    'any.required': 'Card number is required.',
    'string.creditCard': 'Invalid credit card number format.',
  }),
  cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
    'any.required': 'CVV is required.',
    'string.length': 'CVV must be exactly 3 digits.',
    'string.pattern.base': 'CVV must contain only numeric digits.',
  }),
  expirationDate: Joi.required().messages({
    'any.required': 'Expiration date is required.',
  }),
});