const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')


const getBookingById = async (req, res) => {
    const { bookingId } = req.params

    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserBookingsById(bookingId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
}

module.exports = getBookingById