const router = require('express').Router()

const { getDateById, getDates, postDateByExperienceId, deleteDates, putEditDates } = require('../controllers')
const { isAuthorized, isAdmin } = require('../middlewares')



// DATES BY ID
router.get('/:experienceId', getDateById)


// SAVE DATES
router.post('/:experience_id', isAuthorized, isAdmin, postDateByExperienceId)


// GET DATES
router.get('/', getDates)

// EDIT DATES
router.put('/:experience_id', isAuthorized, isAdmin, putEditDates)


// DELETE DATES
router.delete('/',isAuthorized, isAdmin, deleteDates)





module.exports = router