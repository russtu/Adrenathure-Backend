const router = require('express').Router()

const mysqlReviewsRepository = require('../repositories/mysql/mysqlReviewsRepository')


const {isAuthorized } = require('../middlewares')
const { postAReview, getReviewsAverage } = require('../controllers')



// POST A REVIEW
router.post('/:booking_id', isAuthorized, postAReview)


// GET REVIEW AVERAGE
router.get('/:experience_id', getReviewsAverage)


module.exports = router
