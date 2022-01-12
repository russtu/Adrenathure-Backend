const getExperiences = require('./experiencesControllers/getExperiences.js')
const getExperiencesById = require('./experiencesControllers/getExperiencesById.js')
const postCreateExperience = require('./experiencesControllers/postCreateExperience.js')
const putModifyExperience = require('./experiencesControllers/putModifyExperience.js')

const getPlaces = require('./placesControllers/getPlaces')
const getRecommendedPlaces = require('./placesControllers/getRecommendedPlaces')
const getPlaceById = require('./placesControllers/getPlaceById')

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

module.exports = {
    getExperiences,
    getExperiencesById,
    postCreateExperience,
    putModifyExperience,

    getPlaces,
    getRecommendedPlaces,
    getPlaceById,

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
    postUploadAvatar
}