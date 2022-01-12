const mysqlExperiencesRepository = require('../../repositories/mysql/mysqlExperiencesRepository')


const getExperiences = async (req, res) => {
    const {place, date, lowPrice, highPrice} = req.query

    let experiences
    try {
        experiences = await mysqlExperiencesRepository.searchExperiences(place, date, lowPrice, highPrice)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!experiences){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(experiences)
}

module.exports = getExperiences