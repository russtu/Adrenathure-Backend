const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')


const getExperiencesByPlace =  async (req, res) => {
    const place_id = Number (req.params.place_id)

    let experience
    try {

        experience = await mysqlExperiencesRepository.getExperiencesByPlace(place_id)

    } catch (error) {
        res.status(500)
        res.end(error.message)
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

module.exports = getExperiencesByPlace