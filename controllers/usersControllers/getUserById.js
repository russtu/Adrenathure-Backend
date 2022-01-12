const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')


const getUserById = async (req, res) => {
    const userId = req.user.id

    let user
    try {
        user = await mysqlUsersRepository.getUserById(userId)
    } catch (error) {
        res.status(401)
        res.end('Expired or invalid token')
        return
    }

    const { firstName, lastName, email, password } = user

    userToReturn = { firstName, lastName, email, password: '********' }

    res.status (200)
    res.send(userToReturn)
}

module.exports = getUserById