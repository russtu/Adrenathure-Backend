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
        .string()
        .min(0)
        .max(20)
        .required()
        .messages({
            'any.required': 'Price is required',
            'string.empty': 'Price can not be empty',
            'string.min': 'Price is should be between 0 and 20 characters',
            'string.max': 'Price is  should be between 0 and 20 characters'

    }),
    totalSeats: Joi
        .number()
        .integer()
        .min(0)
        .max(20)
        .required()
        .messages({
            'any.required': 'place_id is required',
            'number.base': 'The value of place_id is not a number or could not be cast to a number',
            'number.integer': 'The number is not a valid integer.',
            'number.min': 'totalSeats is should be between 0 and 100 characters',
            'number.max': 'totalSeats is  should be between 0 and 100 characters'

    }),
    experienceDate: Joi
        .date()
        .iso()
        .required()
        .messages({
            'any.required': 'experienceDate is required',
            'string.isoDate': 'experienceDate must be a valid an ISO 8601 date',
            'date.base': 'The value is either not a date or could not be cast to a date from a string or a number.',
            'date.format': 'The date does not match the required format.'
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
            'number.integer': 'The number is not a valid integer.',
            'number.min': 'totalSeats is should be between 0 and 100 characters',
            'number.max': 'totalSeats is  should be between 0 and 100 characters'

    }),
})


module.exports = experienceSchema