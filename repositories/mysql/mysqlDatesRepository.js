const { getExperiencesByIdDate } = require('../../controllers')
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

  const dates = await connection.query('SELECT * FROM dates')
  return dates[0]
}



module.exports = {
  getDateById,
  getDates,
  getDateByIdDate
}

