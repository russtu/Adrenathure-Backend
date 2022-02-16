const mysqlReviewsRepository = require('../../repositories/mysql/mysqlReviewsRepository')


const postAReview = async (req, res) => {
    const userId = req.user.id
    const { booking_id } = req.params
    const { vote } = req.body
    console.log(Number(vote))

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
        res.end(JSON.stringify('This vote already exists'))
        return
    }

    let review
    try {
        review = await mysqlReviewsRepository.postReviewByBookingId(userId, Number(vote), booking_id)
    } catch(error) {
        res.status(500)
        res.end(error.message)
        return
    }

    let getExperienceId
    try {
      getExperienceId = await mysqlReviewsRepository.getExperienceId(booking_id)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    const { experience_id } = getExperienceId

    let AVGVoteByExperienceId
    try {
      AVGVoteByExperienceId = await mysqlReviewsRepository.getAVGReviewByExperienceId(experience_id)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    const { AVG } = AVGVoteByExperienceId

    let saveAVGVote
    try {
      saveAVGVote = await mysqlReviewsRepository.saveAVGReviewByExperienceId(Math.round(AVG), experience_id)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('Your vote was submitted successfully')
}

module.exports = postAReview