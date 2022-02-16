const router = require('express').Router()
const mysqlPlacesRepository = require('../repositories/mysql/mysqlPlacesRepository')

const { getPlaces , getRecommendedPlaces, getPlaceById, postCreatePlace, putModifyPlace} = require('../controllers')


// POST PLACE
router.post('/', postCreatePlace )

// PUT PLACE
router.put('/:placeId', putModifyPlace )

// GET ALL PLACES
router.get('/', getPlaces )

// GET RECOMMENDED PLACES
router.get('/recommended', getRecommendedPlaces)

// GET PLACE BY ID
router.get('/:placeId', getPlaceById)


module.exports = router