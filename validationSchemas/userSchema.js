const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi
        .string()
        .required()
        .email()
        .message({
            'any.required': '[email] is required',
            'string.empty': '[email] is required',
            'string.email': '[email] is not in correct format'
        }),

    password: Joi
        .string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,15})'))
        .messages({
            'any.required': '[password] is required',
            'string.empty': '[password] is required',
            'string.pattern': '[password] should contain at least one lowercase and uppercase letter, one number and to be between 4 and 15 characters.'
        }),

    firstName: Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
            'any.required': '[firstName] is required',
            'string.empty': '[firstName] is required',
            'string.min': '[firstName] should be between 2 and 30 characters',
            'string.max': '[firstName] should be between 2 and 30 characters'
        }),

    lastName: Joi
    .string()
    .required()
    .min(2)
    .max(30)
    .messages({
        'any.required': '[lastName] is required',
        'string.empty': '[lastName] is required',
        'string.min': '[lastName] should be between 2 and 30 characters',
        'string.max': '[lastName] should be between 2 and 30 characters'
    }),

})

module.exports = userSchema