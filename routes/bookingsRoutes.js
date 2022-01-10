const router = require('express').Router()

const { getBookings, postCreateBooking, getBookingById, getAllBookingsByAdmin, getBookingByIdByAdmin } = require('../controllers')
const {isAuthorized } = require('../middlewares')
const { isAdmin } = require('../middlewares')


//ALL BOOKINGS USER

router.get('/', isAuthorized, getBookings)


//SAVE BOOKING

router.post('/:experience_id', isAuthorized, postCreateBooking)


// GET BOOKING BY ID

router.get('/:bookingId', isAuthorized, getBookingById)


// ALL BOOKINGS ADMIN

router.get('/admin/bookings', isAuthorized, isAdmin, getAllBookingsByAdmin)

//BOOKING BY ID ADMIN


router.get('/admin/:bookingId', isAuthorized, isAdmin, getBookingByIdByAdmin)


module.exports = router