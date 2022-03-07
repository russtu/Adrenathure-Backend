const router = require('express').Router()

const { isAuthorized } = require('../middlewares')
const { isAdmin } = require('../middlewares')

const { getExperiences, getExperiencesById, getExperiencesByIdDate, getExperiencesByPlace, postCreateExperience, putModifyExperience, deleteExperience } = require('../controllers')


// GET EXPERIENCE BY PLACE
router.get('/place/:place_id', getExperiencesByPlace)

// GET ALL/FILTER EXPERIENCES
router.get('/', getExperiences)

// GET EXPERIENCE BY ID
router.get('/:experienceId', getExperiencesById)

// GET EXPERIENCE BY ID AND DATE
router.get('/:experienceId/:experienceDate', getExperiencesByIdDate)

// CREATE NEW EXPERIENCE
router.post('/admin', isAuthorized, isAdmin, postCreateExperience )

// MODIFY EXPERIENCE BY ID
router.put('/admin/:experienceId', putModifyExperience )

// DELETE EXPERIENCE BY ID
router.delete('/admin',isAuthorized, isAdmin, deleteExperience )


module.exports = router