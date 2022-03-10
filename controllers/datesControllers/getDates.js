const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')


const getDates = async (req, res) => {


  let dates
  try {
    dates = await mysqlDatesRepository.getDates()

  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  if (!dates) {
    res.status(404)
    res.end('there are not data')
    return
  }
  
  res.status(200)
  res.send(dates)
}

module.exports = getDates