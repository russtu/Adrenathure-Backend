const mysqlReviewsRepository = require('../../repositories/mysql/mysqlReviewsRepository')


const postAReview = async (req, res) => {
    const { booking_id } = req.params
    const { rate, date } = req.body
    let actualDate = new Date(date)
    let rateDivided = (rate/20)

    let tooEarlyVote
    try {
      tooEarlyVote = await mysqlReviewsRepository.earlyVote(booking_id)
    } catch (error) {
      res.status(500)
      res.end(error.message)
      return
    }

    if (tooEarlyVote >= actualDate) {
      res.status(400)
      res.end('You cannot vote before attending the event')
      return
    }

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
        review = await mysqlReviewsRepository.postReviewByBookingId( Number(rateDivided), booking_id)
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