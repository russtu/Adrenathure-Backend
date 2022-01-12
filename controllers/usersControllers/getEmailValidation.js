const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')


const getEmailValidation = async (req, res) => {
    const { registrationCode } = req.params

    if (!registrationCode) {
        res.status(401)
        res.end('No registration code provided')
        return
    }

    try {
        await mysqlUsersRepository.emailConfirmation(registrationCode)
    } catch (error) {
        res.status(401)
        res.end('Invalid registration code')
        return
    }

    res.status(200)
    res.end('Account activated')
}

module.exports = getEmailValidation