const mysqlBookingsRepository = require('../../repositories/mysql/mysqlBookingsRepository')
const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')

const postCreateBooking = async (req, res) => {
  const bookingData = req.body

  const {reservedSeats, experienceDate} = bookingData

  const experience_id = req.params.experience_id
  const userId = req.user.id

  let availableSeats
  try {
    availableSeats = await mysqlDatesRepository.getDateByIdDate(experience_id, experienceDate)
  } catch (error) {
    res.status(500)
    res.end(error.message)
  }


  let booking
  try {
    if (!(Number(reservedSeats) > availableSeats)) {
      booking = await mysqlBookingsRepository.postUserBooking(bookingData, experience_id, userId)
    } else {
      throw new Error('The number of reserved seats are mayor to the number ofavailable seats')
    }
  } catch (error) {
    res.status(400)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send('Experience booking created successfully')
}

module.exports = postCreateBooking