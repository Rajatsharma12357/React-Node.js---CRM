const Joi = require('@hapi/joi');
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$';

const updateProfileValidation = Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().min(2).required().messages({ 
        'string.min': 'Name should have a minimum length of 2 characters',
        'any.required': 'Name should not be empty',
     }),
     lastName: Joi.string().min(2).required().messages({ 
        'string.min': 'Name should have a minimum length of 2 characters',
        'any.required': 'Name should not be empty',
     }),
    // email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).lowercase(),
    email: Joi.string().email().lowercase().messages({ 
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    number: Joi.string(),
    postalCode: Joi.string(),
    userAddress: Joi.object()
})
    .messages({
        'any.required': 'All field must be filled',
    })
module.exports = {
    updateProfileValidation
}