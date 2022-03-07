const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')
const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')
// const experienceSchema = require('../../validationSchemas/experienceSchema')


const deleteBooking = async (req, res) => {
  const bookingId = req.body.bookingId

  if (!bookingId) {
    res.status(404)
    res.end('there are not data')
  }

  let bookings
  try {
    bookings = await mysqlBookingsRepository.getAdminBookingsById(bookingId)
  } catch (error) {
    res.status(500)
    res.end(error.message)
  }

  const { experience_id, experienceDate, reservedSeats } = bookings
 
  let availableSeats
  try {
    availableSeats = await mysqlDatesRepository.getDateByIdDate(experience_id, experienceDate)
  } catch (error) {
    res.status(500)
    res.end(error.message)
  }

  const newAvailableSeats = (reservedSeats + availableSeats.availableSeats)


  let deleted
  try {
    deleted = await mysqlBookingsRepository.deleteBooking(bookingId, experience_id, experienceDate, newAvailableSeats)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send('Booking deleted successfully')
}

module.exports = deleteBooking