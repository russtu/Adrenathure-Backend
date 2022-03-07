const mysqlPlacesRepository = require('../../repositories/mysql/mysqlPlacesRepository')
const { id } = require('../../validationSchemas/experienceSchema')
// const experienceSchema = require('../../validationSchemas/experienceSchema')


const deletePlace = async (req, res) => {
    const placeId = req.body.placeId

    if(!placeId) {
        res.status(404)
        res.end('No data')
    }

    let deleted
    try {
        deleted = await mysqlPlacesRepository.deletePlace(placeId)
    } catch (error) {
        res.status(500)
        res.end('There is existing experience using this place id. Please delete that one as first.')
        return
    }

    res.status(200)
    res.send('Place deleted successfully')
}

module.exports = deletePlace