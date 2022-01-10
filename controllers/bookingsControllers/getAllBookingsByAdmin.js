const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')


const getAllBookingsByAdmin = async (req, res) => {
    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserAllBookings()
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
}

module.exports = getAllBookingsByAdmin