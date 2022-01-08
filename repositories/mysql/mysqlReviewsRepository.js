const connection = require('./mysqlConnection')

const voteExists = async (booking_id) => {
  const verifyVote = await connection.query("SELECT * FROM reviews WHERE booking_id = ?", [booking_id])

  return !!verifyVote[0].length
}

const postReviewByBookingId = async (vote, booking_id) => {
  let date = new Date()

  const results = await connection.query("INSERT INTO reviews (vote, createdAt, booking_id) VALUES ( ?, ?, ? )  ", [vote, date, booking_id])

  return results[0]
}

const getReviewByExperienceId = async (experience_id) => {
  let results = await connection.query("SELECT AVG (vote) FROM reviews, bookings as b WHERE reviews.booking_id = b.id AND b.experience_id = ?", [experience_id])

  return results[0][0]
  // nos está devolviendo un JSON - tratar en front
}

  module.exports = {
      voteExists,
      postReviewByBookingId,
      getReviewByExperienceId
  }