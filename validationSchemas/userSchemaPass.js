const Joi = require('joi')

const userSchema = Joi.object({

  password: Joi
    .string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,15})'))
    .messages({
      'any.required': '[password] is required',
      'string.empty': '[password] is required',
      'string.pattern.base': '[password] should contain at least one lowercase and uppercase letter, one number and to be between 4 and 15 characters.'
    })

})


module.exports = userSchema
