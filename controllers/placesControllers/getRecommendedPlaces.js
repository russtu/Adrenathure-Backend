const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')


const getRecommendedPlaces = async (req, res) => {
    let places
    try {
        places = await mysqlPlacesRepository.getPlacesRecommended()

    } catch (error) {
        res.status('500')
        res.end(error)
        return
    }

    if (!places) {
        res.status(404)
        res.end('No places')
        return
    }

    res.status(200)
    res.send(places)
}

module.exports = getRecommendedPlaces