const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')
const experienceSchema = require('../../validationSchemas/experienceSchema')
const datesSchema = require('../../validationSchemas/datesShema')



const postCreateExperience = async (req, res) => {
  const experienceData = req.body
  const { experienceName, experienceDescription, place_id, price, experienceDate, experienceHour, totalSeats} = req.body

  let avatar
  let path
  if (req.files) {
    avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../public/${avatar.name}`)
    path = `${avatar.name}`
  }


  if (!experienceData) {
    res.status(400)
    res.end('there are not data')
  }

  try {
    await experienceSchema.validateAsync({ experienceName, experienceDescription, place_id, price})
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  try {
    await datesSchema.validateAsync({ experienceDate, experienceHour, totalSeats})
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  let experience
  try {
    experience = await mysqlExperiencesRepository.createExperience(experienceData, path)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  if (!experience) {
    res.status(404)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send('Experience created successfully')
}

module.exports = postCreateExperience
