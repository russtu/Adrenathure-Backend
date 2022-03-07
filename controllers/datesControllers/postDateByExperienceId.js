const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')


const postDateByExperienceId = async (req, res) => {
    const datesData = req.body
    const {experience_id} = req.params

    let date
    try {
        date = await mysqlDatesRepository.postDateByExperienceId(datesData, experience_id)
    } catch(error) {
        res.status(500)
        res.end(error.message)
         return
    }

    res.status(200)
    res.send('Experience date created successfully')
}

module.exports = postDateByExperienceId