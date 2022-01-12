const mysqlReviewsRepository = require('../../repositories/mysql/mysqlReviewsRepository')


const getReviewsAverage = async (req, res) => {
    const { experience_id } = req.params

    let review
    try {
        review = await mysqlReviewsRepository.getReviewByExperienceId(experience_id)
    } catch(error) {
        res.status(400)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send(review)
}

module.exports = getReviewsAverage