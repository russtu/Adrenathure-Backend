const router = require('express').Router()
const mysqlPlacesRepository = require('../repositories/mysql/mysqlPlacesRepository')

const {isAuthorized } = require('../middlewares')
const { isAdmin } = require('../middlewares')

const { getPlaces , getRecommendedPlaces, getPlaceById, postCreatePlace, putModifyPlace, deletePlace} = require('../controllers')


// POST PLACE
router.post('/admin', isAuthorized, isAdmin, postCreatePlace )

// PUT PLACE
router.put('/admin/:placeId', isAuthorized, isAdmin, putModifyPlace )

// GET ALL PLACES
router.get('/', getPlaces )

// GET RECOMMENDED PLACES
router.get('/recommended', getRecommendedPlaces)

// GET PLACE BY ID
router.get('/:placeId', getPlaceById)

// DELETE PLACE BY ID
router.delete('/admin',isAuthorized, isAdmin, deletePlace )


module.exports = router