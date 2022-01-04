const crypto = require("crypto")
const express = require('express')
const bcrypt = require('bcrypt')
require('dotenv').config()
const mysqlUsersRepository = require('./repositories/mysql/mysqlUsersRepository')
const userSchema = require('./validationSchemas/userSchema')
const emailSender = require('./notifiers/emailSender')
const mysqlPlacesRepository = require('./repositories/mysql/mysqlPlacesRepository')


const app = express()

app.use(express.json())


// CONSTANTES
const {BASE_URL, PORT, SALT_ROUNDS  } = process.env

// MIDDLEWARES
// ===========

// USER REGISTRATION
app.post('/users', async (req, res) => {
    const user = req.body

    try {
        await userSchema.validateAsync(user)
    } catch (error) {
        res.status(404)
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
        res.status(403)
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
        res.end('Unexpected error')
        return
    }

    res.status(200)
    res.send('User successfully registered')
})

// EMAIL VALIDATION
app.get('/users/validate/:registrationCode', async (req, res) => {
    const { registrationCode } = req.params

    if (!registrationCode) {
        res.status(400)
        res.end('No registration code provided')
        return
    }

    try {
        await mysqlUsersRepository.emailConfirmation(registrationCode)
    } catch (error) {
        res.status(500)
        res.end('Invalid registration code')
        return
    }

    res.status(200)
    res.end('Account activated')
})


// 10. PLACES. GET /places
app.get('/places', async (req, res) => {
    let places
    try {
        places = await mysqlPlacesRepository.getPlaces()

    } catch (error) {
        res.status('500')
        res.end(error)
        return
    }

    if (!places) {
        res.status(404)
        res.end('No places found')
        return
    }

    res.status(200)
    res.send(places)
})


// 11. PLACES. GET /places/recommended
app.get('/places/recommended', async (req, res) => {

    let places
    try {
        places = await mysqlPlacesRepository.getPlacesRecommended()

    } catch (error) {
        res.status('500')
        res.end(error)
        return
    }

    if (!places) {
        res.status(404)
        res.end('No places')
        return
    }

    res.status(200)
    res.send(places)
})


// 12. PLACES. GET /places/:placeId
app.get('/places/:placeId', async (req, res) => {

    const { placeId } = req.params
    let place
    try {
        place = await mysqlPlacesRepository.getPlacesById(placeId)
    } catch(error) {
        res.status('500')
        res.end(error)
        return
    }

    if (!place) {
        res.status(404)
        res.end('No places')
        return
    }

    res.status(200)
    res.send(place)
})



app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})