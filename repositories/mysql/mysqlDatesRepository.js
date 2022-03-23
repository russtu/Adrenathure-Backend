const connection = require('./mysqlConnection')


const getDateById = async (experienceId) => {
  const dates = await connection.query('SELECT * FROM dates WHERE experience_id = ?', [experienceId])
  return dates[0]
}

const getDateByIdDate = async (experienceId, experienceDate) => {
  const [[dates]] = await connection.query('SELECT availableSeats FROM dates WHERE experience_id = ? AND experiencedate = ?', [experienceId, experienceDate])
  return dates.availableSeats
}

const getDates = async () => {

  const dates = await connection.query('SELECT idDate, DATE_FORMAT(experienceDate, "%Y-%m-%d") AS experienceDate FROM dates')
  return dates[0]
}
const postDateByExperienceId = async (datesData, experience_id ) => {

  const results = await connection.query('INSERT INTO dates ( experienceDate, experienceHour, totalSeats, availableSeats, experience_id ) VALUES (?, ?, ?, ?, ?)', [ datesData.experienceDate, datesData.experienceHour, datesData.totalSeats, datesData.totalSeats, experience_id ])

  return (results[0])
}
const putEditDates = async (experienceData, experienceId ) => {
  const resultsDat = await connection.query("UPDATE dates SET  totalSeats = ?, experienceDate = ?,  experienceHour = ? WHERE dates.idDate = ?  ", [experienceData.totalSeats, experienceData.experienceDate, experienceData.experienceHour, experienceData.dateId])
  return resultsDat
}
const deleteDates = async (dateId) => {

  let results = await connection.query("DELETE FROM dates WHERE idDate = ? ", [dateId])
  return results[0]
}


module.exports = {
  getDateById,
  getDates,
  postDateByExperienceId,
  putEditDates,
  deleteDates,
  getDateByIdDate
}

