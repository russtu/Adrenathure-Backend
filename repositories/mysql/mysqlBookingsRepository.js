const connection = require('./mysqlConnection')


const getUserBookings = async (userId) => {
    const bookings = await connection.query('SELECT * FROM bookings WHERE user_id = ? ORDER BY bookings.bookingDate DESC', [userId])
    return bookings[0]
}


const postUserBooking = async (bookingData, experience_id, user_id) => {
    let numberRandom =Math.round(Math.random()*10)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let bookingNumber = `${year}${month}-${user_id}${numberRandom}`
    const insert = await connection.query('INSERT INTO bookings (bookingDate, bookingNumber, experienceDate, experienceHour, reservedSeats, totalPrice, experience_id, experienceName, placeName, experiencePhoto, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ date, bookingNumber, bookingData.experienceDate, bookingData.experienceHour, bookingData.reservedSeats, bookingData.totalPrice, experience_id, bookingData.experienceName, bookingData.place_id, bookingData.experiencePhoto, user_id ])
    const updateDates = await connection.query('UPDATE dates SET availableSeats = ? WHERE experience_id = ? AND experienceDate = ?', [ bookingData.availableSeats, experience_id, bookingData.experienceDate])
    return (insert[0].insertId)
  }


const getUserBookingsById = async (bookingId) => {
    const bookings = await connection.query('SELECT bookings.*,  DATE_FORMAT(bookings.experienceDate, "%Y/%m/%d") AS experienceDate, DATE_FORMAT(bookings.bookingDate, "%Y/%m/%d") AS bookingDate, users.firstName, users.lastName FROM bookings  LEFT JOIN users ON bookings.user_id = users.id  WHERE bookings.id = ?', [bookingId])
    return bookings[0][0]
}


const getUserAllBookings = async () => {
    const bookings = await connection.query('SELECT DATE_FORMAT(bookings.bookingDate, "%Y-%m-%d") AS bookingDate, bookingNumber, experienceName, totalPrice, reservedSeats, id FROM bookings ORDER BY bookings.bookingDate DESC')
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
