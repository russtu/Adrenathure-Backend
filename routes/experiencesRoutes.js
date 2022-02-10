const router = require('express').Router()

const {isAuthorized } = require('../middlewares')
const { isAdmin } = require('../middlewares')

const { getExperiences, getExperiencesById, getExperiencesByPlace, postCreateExperience, putModifyExperience } = require('../controllers')


// GET ALL/FILTER EXPERIENCES
router.get('/', getExperiences )


// GET EXPERIENCE BY ID
router.get('/:experienceId', getExperiencesById )

// GET EXPERIENCE BY PLACE
router.get('/place/:place_id', getExperiencesByPlace )


// CREATE NEW EXPERIENCE
router.post('/', isAuthorized, isAdmin, postCreateExperience )

// MODIFY EXPERIENCE BY ID
router.put('/:experienceId', putModifyExperience )


module.exports = router