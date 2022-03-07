const connection = require('./mysqlConnection')


const getUserBookings = async (userId) => {
    const bookings = await connection.query('SELECT * FROM bookings WHERE user_id = ?', [userId])
    return bookings[0]
}


const postUserBooking = async (bookingData, experience_id, user_id) => {
    let numberRandom =Math.round(Math.random()*10)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let bookingNumber = `${year}${month}-${user_id}${numberRandom}`

    const insert = await connection.query('INSERT INTO bookings (bookingDate, bookingNumber, experienceDate, experienceHour, reservedSeats, totalPrice, experience_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [ date, bookingNumber, bookingData.experienceDate, bookingData.experienceHour, bookingData.reservedSeats, bookingData.totalPrice, experience_id, user_id ])
    const updateDates = await connection.query('UPDATE dates SET availableSeats = ? WHERE experience_id = ? AND experienceDate = ?', [ bookingData.availableSeats, experience_id, bookingData.experienceDate])

    return (insert[0], updateDates[0])
  }


const getUserBookingsById = async (bookingId) => {
    const bookings = await connection.query('SELECT bookings.*, experiences.experienceName, dates.experienceDate, dates.experienceHour, experiences.photo, users.firstName, users.lastName, places.placeName FROM bookings LEFT JOIN experiences ON bookings.experience_id = experiences.id LEFT JOIN dates ON bookings.experience_id = dates.experience_id LEFT JOIN users ON bookings.user_id = users.id LEFT JOIN places ON experiences.place_id = places.id WHERE bookings.id = ?', [bookingId])
    return bookings[0][0]
}


const getUserAllBookings = async () => {
    const bookings = await connection.query('SELECT * FROM bookings')
    return bookings[0]
}


const getAdminBookingsById = async (bookingId) => {
    const bookings = await connection.query('SELECT * FROM bookings WHERE id = ?', [bookingId])
    return bookings[0][0]
}

const deleteBooking = async ( bookingId, exexperience_id, experienceDate, newAvailableSeats ) => {
  const results = await connection.query("DELETE FROM bookings WHERE id = ? ", [bookingId])
  const updateDates = await connection.query('UPDATE dates SET availableSeats = ? WHERE experience_id = ? AND experienceDate = ?', [ newAvailableSeats, exexperience_id, experienceDate])

  return results[0]
}


module.exports = {
  getUserBookings,
  postUserBooking,
  getUserBookingsById,
  getUserAllBookings,
  getAdminBookingsById,
  deleteBooking
}
