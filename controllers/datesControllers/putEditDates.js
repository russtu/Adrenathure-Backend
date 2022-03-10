const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')
// const experienceSchema = require('../../validationSchemas/experienceSchema')


const putEditDates = async (req, res) => {
  const experienceData = req.body
  const experienceId = req.params.experienceId

 if (!experienceData) {
    res.status(400)
    res.end('You should provide a valid user to save')
    return
  }
  // try {
  //   await experienceSchema.validateAsync(experienceData)
  // } catch (error) {
  //   res.status(404)
  //   res.end(error.message)
  //   return
  // }

  let editedDate
  try {
    editedDate = await mysqlDatesRepository.putEditDates( experienceData, experienceId )
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
  
  res.status(200)
  res.send(`La fecha ha sido modificada correctamente`)
}

module.exports = putEditDates