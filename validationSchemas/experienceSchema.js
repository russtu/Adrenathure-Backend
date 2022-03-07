const Joi = require('joi');


const experienceSchema = Joi.object({
    experienceName: Joi
        .string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'any.required': 'Experience name is required',
            'string.empty': 'Experience name  can not be empty',
            'string.min': 'Experience name is should be between 3 and 50 characters',
            'string.max': 'Experience name is  should be between 3 and 50 characters'
        }),

    experienceDescription: Joi
        .string()
        .min(3)
        .max(500)
        .required()
        .messages({
            'any.required': 'Experience description is required',
            'string.empty': 'Experience description can not be empty',
            'string.min': 'Experience description is should be between 3 and 500 characters',
            'string.max': 'Experience description is  should be between 3 and 500 characters'
    }),

    price: Joi
        .number()
        .integer()
        .required()
        .messages({
            'any.required': 'price is required',
            'number.base': 'The value of price is not a number or could not be cast to a number',
            'number.integer': 'The number is not a valid integer.',

    }),

  place_id: Joi
    .number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .messages({
      'any.required': 'place_id is required',
      'number.base': 'The value of place_id is not a number or could not be cast to a number',
      'number.integer': 'The number of place_id is not a valid integer.',
      'number.min': 'place_id is should be between 0 and 100 characters',
      'number.max': 'place_id is  should be between 0 and 100 characters'
    }),

})


module.exports = experienceSchema