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
    })

})


module.exports = userSchema
