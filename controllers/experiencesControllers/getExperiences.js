const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')
const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')



const getExperiences = async (req, res) => {
  const { place, dateTo, dateFrom, lowPrice, highPrice } = req.query
  let experiences
  let dates
  try {
    if (place || dateFrom || dateTo || lowPrice || highPrice) {
      experiences = await mysqlExperiencesRepository.searchExperiences(place, dateFrom , dateTo , lowPrice, highPrice)
    } else {
      experiences = await mysqlExperiencesRepository.getExperiences()
    }
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  if (!experiences) {
    res.status(404)
    res.end('there are not data')
    return
  }
  
  res.status(200)
  res.send(experiences)
}

module.exports = getExperiences