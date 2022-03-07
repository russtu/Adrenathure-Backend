const router = require('express').Router()

const {isAuthorized } = require('../middlewares')
//const { isAdmin } = require('../middlewares')
const { getDateById, getDates } = require('../controllers')



// DATES BY ID
router.get('/:experienceId', isAuthorized, getDateById)

// GET DATES
router.get('/', getDates)


module.exports = router