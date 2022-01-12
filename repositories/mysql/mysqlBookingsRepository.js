const connection = require('./mysqlConnection')


const getUserBookings = async (userId) => {
    const bookings = await connection.query('SELECT * FROM bookings WHERE user_id = ?', [userId])
    return bookings[0]
}


const postUserBooking = async (bookingDate, reservedSeats, experience_id, user_id) => {
    let numerRandom =Math.round(Math.random()*1000)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let bookingNumber = `${year}${numerRandom}${month}`

    const insert = await connection.query('INSERT INTO bookings (bookingDate, reservedSeats, bookingNumber, experience_id, user_id) VALUES (?, ?, ?, ?, ?)', [ bookingDate, reservedSeats, bookingNumber, experience_id, user_id ])
    return insert[0]
}


const getUserBookingsById = async (bookingId) => {
    const bookings = await connection.query('SELECT * FROM bookings WHERE id = ?', [bookingId])
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


module.exports = {
  getUserBookings,
  postUserBooking,
  getUserBookingsById,
  getUserAllBookings,
  getAdminBookingsById
}
