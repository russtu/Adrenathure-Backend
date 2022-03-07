const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')
// const experienceSchema = require('../../validationSchemas/experienceSchema')


const deleteExperience = async (req, res) => {
    const experienceId = req.body.expId

    if(!experienceId) {
        res.status(404)
        res.end('there are not data')
    }

    let deleted
    try {
        deleted = await mysqlExperiencesRepository.deleteExperience(experienceId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('Experience deleted successfully')
}

module.exports = deleteExperience