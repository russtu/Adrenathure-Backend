const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')


const getDateById = async (req, res) => {
  const { experienceId } = req.params

    let dates
    try {
        dates = await mysqlDatesRepository.getDateById(experienceId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!dates){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(dates)
}

module.exports = getDateById