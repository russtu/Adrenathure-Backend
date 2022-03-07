const mysqlDatesRepository = require('../../repositories/mysql/mysqlDatesRepository')


const deleteDates = async (req, res) => {
    const dateId = req.body.dateId
    
    if(!dateId) {
        res.status(404)
        res.end('there are not data')
    }

    let deleted
    try {
        deleted = await mysqlDatesRepository.deleteDates(dateId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    // if(!deleted){
    //     res.status(404)
    //     res.end(error.message)
    //     return
    // }

    res.status(200)
    res.send('Date deleted successfully')
}

module.exports = deleteDates