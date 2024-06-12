const Joi = require('@hapi/joi');
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$';

const registerSchema = Joi.object({
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
    password: Joi.string().regex(RegExp(pattern)).min(6).max(20).label('password').messages({
        'string.min': 'Password should be at least 6 characters',
        'string.max': 'Password should not exceed 12 characters',
        'string.pattern.base': 'Password is too weak. Choose a stronger password with at least one lowercase letter, one uppercase letter, one digit, and one special character.',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).label('confirmPassword').messages({ 'any.only': 'confirmPassword does not match' }),
    isChecked:Joi.boolean().required()
})
    .messages({
        'any.required': 'All field must be filled',
    })
module.exports = {
    registerSchema
}