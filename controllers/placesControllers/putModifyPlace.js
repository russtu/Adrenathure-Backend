const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')
const placeSchema = require('../../validationSchemas/placeSchema')


const putModifyPlace = async (req, res) => {
  const placeData = req.body
  console.log(placeData)
  const placeId = req.params.placeId
  let avatar
  let path
  if (req.files) {
    avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../public/${avatar.name}`)
    path = `${avatar.name}`
  }


  if (!placeData) {
    res.status(400)
    res.end('You should provide a valid place to save')
    return
  }

  // try {
  //   await placeSchema.validateAsync(placeData)
  // } catch (error) {
  //   res.status(404)
  //   res.end(error.message)
  //   return
  // }

  let editedPlace
  try {
    editedPlace = await mysqlPlacesRepository.editPlace(placeData, placeId, path)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  res.status(200)
  res.send(`El destino ha sido modificada correctamente`)
}

module.exports = putModifyPlace