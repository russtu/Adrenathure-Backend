const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')


const postCreateBooking = async (req, res) => {
    const bookingData = req.body

    const experience_id = req.params.experience_id
    const userId = req.user.id
    let booking
    try {
        booking = await mysqlBookingsRepository.postUserBooking(bookingData, experience_id, userId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
         return
    }

    res.status(200)
    res.send('Experience booking created successfully')
}

module.exports = postCreateBooking