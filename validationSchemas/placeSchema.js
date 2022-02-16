const Joi = require('joi');


const placeSchema = Joi.object({
    placeName: Joi
        .string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'any.required': 'Place name is required',
            'string.empty': 'Place name  can not be empty',
            'string.min': 'Place name is should be between 3 and 50 characters',
            'string.max': 'Place name is  should be between 3 and 50 characters'
        }),

    placeDescription: Joi
        .string()
        .min(3)
        .max(900)
        .required()
        .messages({
            'any.required': 'Place description is required',
            'string.empty': 'Place description can not be empty',
            'string.min': 'Place description is should be between 3 and 500 characters',
            'string.max': 'Place description is  should be between 3 and 500 characters'
    }),

    coordsLong: Joi
        .number()
        .required()
        .messages({
            'any.required': 'coordenadas longitude is required',
            'number.base': 'The value of cords is not a number or could not be cast to a number',
            'number': 'The value is not a number.',
    }),

    coordsLat: Joi
        .number()
        .required()
        .messages({
            'any.required': 'price is required',
            'number.base': 'The value of cords is not a number or could not be cast to a number',
            'number': 'The value is not a number.',
    }),


})


module.exports = placeSchema