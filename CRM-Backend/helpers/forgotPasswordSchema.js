const Joi = require('@hapi/joi');

const forgotPasswordSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'any.required': 'Email is required',
     }).lowercase(),
})
const verificationEmailSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'any.required': 'Email is required',
     }).lowercase(),
})
module.exports = {
    forgotPasswordSchema,
    verificationEmailSchema
}