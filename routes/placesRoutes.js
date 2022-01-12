const router = require('express').Router()
const mysqlPlacesRepository = require('../repositories/mysql/mysqlPlacesRepository')

const { getPlaces , getRecommendedPlaces, getPlaceById} = require('../controllers')


// GET ALL PLACES
router.get('/', getPlaces )

// GET RECOMMENDED PLACES
router.get('/recommended', getRecommendedPlaces)


// GET PLACE BY ID
router.get('/:placeId', getPlaceById)


module.exports = router