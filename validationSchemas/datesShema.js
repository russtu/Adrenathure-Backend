const Joi = require('joi');

const datesSchema = Joi.object({

  totalSeats: Joi
    .number()
    .integer()
    .min(0)
    .max(20)
    .required()
    .messages({
      'any.required': 'totalSeats is required',
      'number.base': 'The value of totalSeats is not a number or could not be cast to a number',
      'number.integer': 'The number of totalSeats is not a valid integer.',
      'number.min': 'totalSeats is should be between 0 and 20 characters',
      'number.max': 'totalSeats is  should be between 0 and 20 characters'
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

  dateId: Joi
    .number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .messages({
      'any.required': 'dateId is required',
      'number.base': 'The value of dateId is not a number or could not be cast to a number',
      'number.integer': 'The number of dateId is not a valid integer.',
      'number.min': 'dateId is should be between 0 and 100 characters',
      'number.max': 'dateId is  should be between 0 and 100 characters'
    }),

  experienceHour: Joi
    .string()
    .required()
    // .regex(/^([0-9]{2}):([0-9]{2})$/)
    .messages({
      'any.required': 'experienceHour is required',
      'string.empty': 'Experience description can not be empty'
    })
})


module.exports = datesSchema