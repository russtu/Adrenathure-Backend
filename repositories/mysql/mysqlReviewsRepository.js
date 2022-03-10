const connection = require('./mysqlConnection')


const voteExists = async (booking_id) => {
  const verifyVote = await connection.query("SELECT * FROM reviews WHERE booking_id = ?", [booking_id])
  return !!verifyVote[0].length
}


const postReviewByBookingId = async ( vote, booking_id) => {
  const results = await connection.query("INSERT INTO reviews (vote, booking_id) VALUES ( ?, ? )  ", [ vote, booking_id])
  return results[0]
}


const getExperienceId = async (booking_id) => {
  let results = await connection.query("SELECT bookings.experience_id FROM bookings WHERE bookings.id= ?", [booking_id])
  return results[0][0]
}

const getAVGReviewByExperienceId = async (experience_id) => {
  let results = await connection.query("SELECT AVG(vote) as AVG FROM reviews, bookings as b WHERE reviews.booking_id = b.id AND b.experience_id = ?", [experience_id])
  return results[0][0]
}

const saveAVGReviewByExperienceId = async (AVG, experience_id) => {
  let results = await connection.query("UPDATE experiences SET experiences.AVGVote = ? WHERE experiences.id = ?" ,[AVG, experience_id])
  return results
}


module.exports = {
    voteExists,
    postReviewByBookingId,
    getExperienceId,
    getAVGReviewByExperienceId,
    saveAVGReviewByExperienceId
}