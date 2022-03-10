const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')
const datesSchema = require('../../validationSchemas/datesShema')


const postDateByExperienceId = async (req, res) => {
  const datesData = req.body
  const { experience_id } = req.params

  try {
    await datesSchema.validateAsync(datesData)
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  let date
  try {
    date = await mysqlDatesRepository.postDateByExperienceId(datesData, experience_id)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send('Experience date created successfully')
}

module.exports = postDateByExperienceId