const router = require('express').Router()

const {isAuthorized } = require('../middlewares')
// const { isAdmin } = require('../middlewares')
const { getDateById, getDates } = require('../controllers')



// DATES BY ID
router.get('/:experienceId', isAuthorized, getDateById)


// // SAVE BOOKING
// router.post('/:experience_id', isAuthorized, postCreateBooking)


// GET DATES
router.get('/', getDates)


// // ALL BOOKINGS ADMIN
// router.get('/admin/bookings', isAuthorized, isAdmin, getAllBookingsByAdmin)

// // BOOKING BY ID ADMIN
// router.get('/admin/:bookingId', isAuthorized, isAdmin, getBookingByIdByAdmin)


module.exports = router