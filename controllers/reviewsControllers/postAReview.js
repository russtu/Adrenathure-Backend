const mysqlReviewsRepository = require('../../repositories/mysql/mysqlReviewsRepository')


const postAReview = async (req, res) => {
    const { booking_id } = req.params
    const { vote } = req.body

    let voteAlreadyExists
    try {
        voteAlreadyExists = await mysqlReviewsRepository.voteExists(booking_id)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (voteAlreadyExists) {
        res.status(403)
        res.end('This vote already exists')
        return
    }

    let review
    try {
        review = await mysqlReviewsRepository.postReviewByBookingId(vote, booking_id)
    } catch(error) {
        res.status(500)
        res.end('Database error')
        return
    }

    res.status(200)
    res.send('Your vote was submitted successfully')
}

module.exports = postAReview