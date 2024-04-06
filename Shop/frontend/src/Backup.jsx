// const handleValid = (ev, item) => {
//     const { name, value } = ev.target;


//     const obj = name === 'nutritionalValue'
//         ? { ...formData, [name]: { ...formData.nutritionalValue, [item]: +value } }
//         : name === 'img' ? { ...formData, [name]: { ...formData.img, [item]: value } } : { ...formData, [name]: value }
//     setFormData(obj)
//     const validate = productValidationSchema.validate(obj, { abortEarly: false })
//     const tempErrors = { ...errors }
//     delete tempErrors[name];
//     if (validate.error) {
//         const item = validate.error.details.find((e) => e.context.key == name)
//         if (item) {
//             tempErrors[name] = item.message;
//         }
//     }
//     setIsFormValid(!validate.error)
//     setErrors(tempErrors)
// }


// import Joi from "joi";

// const futureDate = Joi.extend((joi) => ({
//   type: "futureDate",
//   base: joi.date(),
//   messages: {
//     "futureDate.base": "Date cannot be a past date.",
//     "futureDate.tooFar": "Date cannot be more than two months in the future.",
//   },
//   validate(value, helpers) {
//     const currentDate = new Date();
//     const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1); // Date after today
//     const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate()); // Two months from now

//     if (value < minDate) {
//       return { value, errors: helpers.error("futureDate.base") };
//     }
//     if (value > maxDate) {
//       return { value, errors: helpers.error("futureDate.tooFar") };
//     }
//     return value;
//   },
// }));

// export const checkoutSchema = Joi.object({
//   cardHolder: Joi.string().required().pattern(/^[A-Za-z]+$/)
//     .min(2).max(20).messages({
//       'any.required': 'Card owner name is required.',
//       'string.empty': 'name must not be empty.',
//       'string.min': 'Owner Name Min 2 Letters.',
//       'string.pattern.base': 'Name must contain only letters.',
//     }),
//   cardNumber: Joi.string().creditCard().length(16).required().messages({
//     'any.required': 'Card number is required.',
//     'string.creditCard': 'Invalid credit card number format.',
//     'string.length': 'Credit card number must be exactly 16 digits.',
//   }),
//   cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
//     'any.required': 'CVV is required.',
//     'string.length': 'CVV must be exactly 3 digits.',
//     'string.pattern.base': 'CVV must contain only numeric digits.',
//   }),
//   expirationDate: futureDate.futureDate().required().messages({
//     'any.required': 'Expiration date is required.',
//     'futureDate.base': 'Expiration date cannot be a past date.',
//     'futureDate.tooFar': 'Expiration date cannot be more than two months in the future.',
//   }),
//   deliveryDate: futureDate.futureDate().required().messages({
//     'any.required': 'Delivery date is required.',
//     'futureDate.base': 'Delivery date cannot be a past date.',
//     'futureDate.tooFar': 'Delivery date cannot be more than two months in the future.',
//   }),
// });
