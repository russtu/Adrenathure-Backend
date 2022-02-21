const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')
const placeSchema = require('../../validationSchemas/placeSchema')


const postCreatePlace = async (req, res) => {
  const placeData = req.body
  let avatar
  let path
  if (req.files) {
    avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../public/${avatar.name}`)
    path = `${avatar.name}`
  }

  if (!placeData) {
    res.status(404)
    res.end('there are not data')
  }

  try {
    await placeSchema.validateAsync(placeData)
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  let place
  try {
    place = await mysqlPlacesRepository.createPlace(placeData, path)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  if (!place) {
    res.status(404)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send('Place created successfully')
}

module.exports = postCreatePlace