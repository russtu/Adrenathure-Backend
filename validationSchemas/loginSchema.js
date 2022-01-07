const Joi = require('joi')

const loginSchema = Joi.object({
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
})

module.exports = loginSchema