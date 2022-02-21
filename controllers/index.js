const getExperiences = require('./experiencesControllers/getExperiences.js')
const getExperiencesById = require('./experiencesControllers/getExperiencesById.js')
const getExperiencesByPlace = require('./experiencesControllers/getExperiencesByPlace.js')
const postCreateExperience = require('./experiencesControllers/postCreateExperience.js')
const putModifyExperience = require('./experiencesControllers/putModifyExperience.js')
const deleteExperience = require('./experiencesControllers/deleteExperience.js')

const getPlaces = require('./placesControllers/getPlaces')
const getRecommendedPlaces = require('./placesControllers/getRecommendedPlaces')
const getPlaceById = require('./placesControllers/getPlaceById')
const postCreatePlace = require('./placesControllers/postCreatePlace')
const putModifyPlace = require('./placesControllers/putModifyPlace')

const postAReview = require('./reviewsControllers/postAReview')
const getReviewsAverage = require('./reviewsControllers/getReviewsAverage')

const getBookings = require('./bookingsControllers/getBookings')
const postCreateBooking = require('./bookingsControllers/postCreateBooking')
const getBookingById = require('./bookingsControllers/getBookingsById')
const getAllBookingsByAdmin = require('./bookingsControllers/getAllBookingsByAdmin')
const getBookingByIdByAdmin = require('./bookingsControllers/getBookingByIdByAdmin')

const postRegister = require('./usersControllers/postRegister')
const getEmailValidation = require('./usersControllers/getEmailValidation')
const postLogin = require('./usersControllers/postLogin')
const getUserById = require('./usersControllers/getUserById')
const putEditUser = require('./usersControllers/putEditUser')
const postUploadAvatar = require('./usersControllers/postUploadAvatar')

const getDateById = require('./datesControllers/getDateById')
const getDates = require('./datesControllers/getDates')

module.exports = {
    getExperiences,
    getExperiencesById,
    getExperiencesByPlace,
    postCreateExperience,
    putModifyExperience,
    deleteExperience,

    getPlaces,
    getRecommendedPlaces,
    getPlaceById,
    postCreatePlace,
    putModifyPlace,

    postAReview,
    getReviewsAverage,

    getBookings,
    postCreateBooking,
    getBookingById,
    getAllBookingsByAdmin,
    getBookingByIdByAdmin,

    postRegister,
    getEmailValidation,
    postLogin,
    getUserById,
    putEditUser,
    postUploadAvatar,

    getDateById,
    getDates
}