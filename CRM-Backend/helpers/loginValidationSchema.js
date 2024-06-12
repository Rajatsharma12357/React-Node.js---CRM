const Joi = require('@hapi/joi');
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$';

const loginSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'any.required': 'Email is required',
     }).lowercase(),
    password: Joi.string().required()
})
.messages({
    'any.required':'All field must be filled',
})
module.exports = {
    loginSchema
}