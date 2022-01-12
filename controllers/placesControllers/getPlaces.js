const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')


const getPlaces = async (req, res) => {
    let places
    try {
        places = await mysqlPlacesRepository.getPlaces()
    } catch (error) {
        res.status('500')
        res.end(error.message)
        return
    }

    if (!places) {
        res.status(404)
        res.end('No places found')
        return
    }

    res.status(200)
    res.send(places)
}

module.exports = getPlaces