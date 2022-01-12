const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')


const getPlaceById = async (req, res) => {
    const { placeId } = req.params

    let place
    try {
        place = await mysqlPlacesRepository.getPlacesById(placeId)
    } catch(error) {
        res.status('500')
        res.end(error)
        return
    }

    if (!place) {
        res.status(404)
        res.end('No places')
        return
    }

    res.status(200)
    res.send(place)
}

module.exports = getPlaceById