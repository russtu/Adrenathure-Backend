const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')
const experienceSchema = require('../../validationSchemas/experienceSchema')


const putModifyExperience = async (req, res) => {
    const experienceData = req.body
    const experienceId = req.params.experienceId
    const avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../public/${avatar.name}`)
    const path = `${avatar.name}`

    if (!experienceData) {
      res.status(400)
      res.end('You should provide a valid user to save')
      return
    }

    try {
        await experienceSchema.validateAsync(experienceData)
      } catch (error) {
        res.status(404)
        res.end(error.message)
        return
      }

    let editedExperience
    try {
      editedExperience = await mysqlExperiencesRepository.editExperience(experienceData, experienceId,path)
    } catch (error) {
      res.status(500)
      res.end(error.message)
      return
    }

    res.status(200)
    res.send(`La experiencia ha sido modificada correctamente`)
  }

module.exports = putModifyExperience