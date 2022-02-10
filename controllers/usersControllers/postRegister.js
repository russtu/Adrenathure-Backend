const express = require('express')
const crypto = require("crypto")
const bcrypt = require('bcrypt')
require('dotenv').config()

const emailSender = require('../../notifiers/emailSender')
const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')
const userSchema = require('../../validationSchemas/userSchema')

const app = express()

app.use(express.json())

const { SALT_ROUNDS } = process.env


const postRegister = async (req, res) => {
    const user = req.body

    try {
        await userSchema.validateAsync(user)
    } catch (error) {
        res.status(422)
        res.end(error.message)
        return
    }

    let userExists
    try {
        userExists = await mysqlUsersRepository.userExists(user)
    } catch (error) {
        res.status(500)
        res.end('Database error')
        return
    }

    if (userExists) {
        console.error('User already exists')
        res.status(409)
        res.end('User already exists')
        return
    }

    let encryptedPassword
    try {
        encryptedPassword = await bcrypt.hash(user.password, Number(SALT_ROUNDS))
    } catch (error) {
        res.status(500)
        res.end('Unexpected error')
        return
    }

    const registrationCode = crypto.randomBytes(50).toString('hex')

    let savedUser
    try {
        savedUser = await mysqlUsersRepository.saveUser({ ...user, password: encryptedPassword, registrationCode })
    } catch (error) {
        res.status(500)
        res.end('Database error')
        return
    }

    try {
        emailSender.accountConfirmationEmail({ sendTo: savedUser.email, registrationCode })
    } catch (error) {
        res.status(500)
        res.send('Unexpected error')
        return
    }

    res.status(200)
    res.send({ message: 'User registered successfully'})
}

module.exports = postRegister