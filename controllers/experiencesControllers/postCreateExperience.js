

const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')
const experienceSchema = require('../../validationSchemas/experienceSchema')


const postCreateExperience = async (req, res) => {
    const experienceData = req.body

    if(!experienceData) {
        res.status(404)
        res.end('there are not data')

    }

    try {
        await experienceSchema.validateAsync(experienceData)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    let experience
    try {
        experience = await mysqlExperiencesRepository.createExperience(experienceData)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if(!experience){
        res.status(404)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('Experience created successfully')
}

module.exports = postCreateExperience