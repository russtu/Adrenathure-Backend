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

    const insert = await connection.query('INSERT INTO bookings (bookingDate, bookingNumber, adventureDate, adventureHour, reservedSeats, totalPrice, experience_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [ date, bookingNumber, bookingData.adventureDate, bookingData.adventureHour, bookingData.reservedSeats, bookingData.totalPrice, experience_id, user_id ])
    return insert[0]
}


const getUserBookingsById = async (bookingId) => {
    const bookings = await connection.query('SELECT bookings.*, experiences.experienceName, experiences.experienceDate, experiences.experienceHour, experiences.photo, users.firstName, users.lastName, places.placeName FROM bookings LEFT JOIN experiences ON bookings.experience_id = experiences.id LEFT JOIN users ON bookings.user_id = users.id LEFT JOIN places ON experiences.place_id = places.id WHERE bookings.id = ?', [bookingId])
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
