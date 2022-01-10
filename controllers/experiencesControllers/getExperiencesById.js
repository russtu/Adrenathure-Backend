const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')


const getExperiencesById =  async (req, res) => {
    const experienceId = Number (req.params.experienceId)

    let experience
    try {

        experience = await mysqlExperiencesRepository.getExperienceById(experienceId)

    } catch (error) {
        res.status(500)
        res.end('database error')
        return
    }

    if(!experience){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(experience)
}

module.exports = getExperiencesById