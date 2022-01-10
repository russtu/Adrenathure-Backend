const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')



const getBookings = async (req, res) => {
    const userId = req.user.id
    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserBookings(userId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send(bookings)
}

module.exports = getBookings