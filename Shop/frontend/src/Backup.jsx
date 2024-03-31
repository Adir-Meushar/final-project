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
