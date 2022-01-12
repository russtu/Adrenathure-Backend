const router = require('express').Router()

const {isAuthorized } = require('../middlewares')
const { isAdmin } = require('../middlewares')

const { getExperiences, getExperiencesById, postCreateExperience, putModifyExperience } = require('../controllers')


// GET ALL/FILTER EXPERIENCES
router.get('/', getExperiences )


// GET EXPERIENCE BY ID
router.get('/:experienceId', getExperiencesById )


// CREATE NEW EXPERIENCE
router.post('/', isAuthorized, isAdmin, postCreateExperience )

// MODIFY EXPERIENCE BY ID
router.put('/:experienceId', putModifyExperience )


module.exports = router