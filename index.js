const crypto = require("crypto")
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fileUpload = require('express-fileupload')
require('dotenv').config()
const mysqlUsersRepository = require('./repositories/mysql/mysqlUsersRepository')
const userSchema = require('./validationSchemas/userSchema')
const loginSchema = require('./validationSchemas/loginSchema')
const emailSender = require('./notifiers/emailSender')
const mysqlPlacesRepository = require('./repositories/mysql/mysqlPlacesRepository')
const mysqlExperiencesRepository = require('./repositories/mysql/mysqlExperiencesRepository')
const experienceSchema = require('./validationSchemas/experienceSchema')


const app = express()

app.use(express.json())

app.use('/public', express.static('uploads'))
app.use(fileUpload())


// CONSTANTES
const { BASE_URL, PORT, SALT_ROUNDS, JWT_PRIVATE_KEY, JWT_EXPIRES_AFTER  } = process.env

// MIDDLEWARES
// ===========

// AUTHORIZATION
const isAuthorized = (req, res, next) => {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
        res.status(401)
        res.end('You are not authorized')
        return
    }

    const token = bearerToken.replace('Bearer ', '')

    let decodedToken

    try {
        decodedToken = jwt.verify(token, JWT_PRIVATE_KEY)
    } catch (error) {
        res.status(401)
        res.end('Expired or invalid token')
        return
    }

    req.user = { ...decodedToken.user }

    next()
}


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


// LOGIN
app.post('/users/login', async (req, res) => {
    const credentials = req.body

    if (!credentials.email || !credentials.password) {
      res.status(400)
      res.end('You should provide an email and password')
      return
    }

    try {
        await loginSchema.validateAsync(credentials)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    let user
    try {
      user = await mysqlUsersRepository.getUserByEmail(credentials.email)
    } catch (error) {
      res.status(500)
      res.end('Database error')
      return
    }

    if (!user) {
      res.status(404)
      res.end('User not found')
      return
    }

    if (!await bcrypt.compare(credentials.password, user.password)) {
      res.status(403)
      res.end('Invalid credentials')
      return
    }

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + Number(JWT_EXPIRES_AFTER),
      user: { id: user.id, role: user.role }
    }, JWT_PRIVATE_KEY);

    res.status(200)
    res.send({ token })
  })


// GET USER BY ID
app.get('/users/profile', isAuthorized, async (req, res) => {
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
    // next()
})


// EDIT USER
app.put('/users', isAuthorized, async (req, res) => {
    const userId = req.user.id
    const user = req.body

    try {
        await userSchema.validateAsync(user)
    } catch (error) {
        res.status(404)
        res.end(error.message)
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

    let editedUser
    try {
        editedUser = await mysqlUsersRepository.editUser({ ...user, password: encryptedPassword }, userId)
    } catch (error) {
        res.status(500)
        res.end('Database error')
        return
    }

    console.log(editedUser)
    res.status(200)
    res.end('User data edited')
    // next()
})


// AVATAR UPLOAD
app.post('/users/uploads', isAuthorized, (req,res) => {
    const userId = req.user.id

    const avatar = req.files.avatar

    avatar.mv(`./uploads/${userId}-${avatar.name}`)

    res.send('OK')
})

// GET ALL EXPERIENCES
app.get('/experiences', async (req, res) => {

    let experiences
    try {
        experiences = await mysqlExperiencesRepository.getExperiences()

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!experiences){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(experiences)
})


// GET EXPERIENCE BY ID
app.get('/experiences/:experienceId', async (req, res) => {
    const experienceId = Number (req.params.experienceId)

    let experience
    try {
        experience = await mysqlExperiencesRepository.getExperienceById(experienceId)

    } catch (error) {
        res.status(500)
        res.end('database error')
        return
    }

    if(!experience){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(experience)
})


// CREATE NEW EXPERIENCE
app.post('/experiences', isAuthorized, async (req, res) => {
    const experienceData = req.body

    if(!experienceData) {
        res.status(404)
        res.end('there are not data')

    }

    try {
        await experienceSchema.validateAsync(experienceData)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    let experience
    try {
        experience = await mysqlExperiencesRepository.createExperience(experienceData)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if(!experience){
        res.status(404)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('Experience created successfully')
})


// MODIFICAR EXPERIENCIA
app.put('/experiences/:experienceId', isAuthorized, async (req, res) => {
    const experienceData = req.body
    const experienceId = req.params.experienceId

    if (!experienceData) {
      res.status(400)
      res.end('You should provide a valid user to save')
      return
    }

    try {
        await experienceSchema.validateAsync(experienceData)
      } catch (error) {
        res.status(404)
        res.end(error.message)
        return
      }

    let editedExperience
    try {
      editedExperience = await mysqlExperiencesRepository.editExperience(experienceData, experienceId)
    } catch (error) {
      res.status(500)
      res.end(error.message)
      return
    }

    res.status(200)
    res.send(`La experiencia ha sido modificada correctamente`)
  })


// SEARCH EXPERIENCE
app.get('/experiences-filter', async (req, res) => {
    const {place, date, lowPrice, highPrice} = req.query

    let experiences
    try {
        experiences = await mysqlExperiencesRepository.searchExperiences(place, date, lowPrice, highPrice)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!experiences){
        res.status(404)
        res.end('there are not data')
        return
    }

    res.status(200)
    res.send(experiences)
})


// GET ALL PLACES
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


// GET RECOMMENDED PLACES
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


// GET PLACE BY ID
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

// 6. BOOKINGS. GET/USER/BOOKINGS

app.get('/users/booking', isAuthorized, async (req, res) => {

    const userId = req.user.id

    // if (user === 'admin') {
    //     res.status(400)
    //     res.end('Only normal users')
    // }

    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserBookings(userId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
})



// 6.1 BOOKINGS. GET/USER/BOOKINGS

app.post('/users/:experience_id/booking', isAuthorized, async (req, res) => {
    const { reservedSeats, bookingDate  } = req.body
    const experience_id = req.params.experience_id
    const userId = req.user.id
    let booking


    try {
        booking = await mysqlBookingsRepository.postUserBooking(bookingDate, reservedSeats, experience_id, userId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }


    res.status(200)
    res.send('La reserva se ha efectuado correctamente')

})

// 7. BOOKINGS. GET/USER/BOOKINGS/:bookingId

app.get('/users/booking/:bookingId', isAuthorized, async (req, res) => {
    const { bookingId } = req.params


    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserBookingsById(bookingId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
})


// 8. BOOKINGS. GET/USER/ADMIN/BOOKINGS

app.get('/users/admin/bookings', isAuthorized, isAdmin, async (req, res) => {


    let bookings
    try {
        bookings = await mysqlBookingsRepository.getUserAllBookings()
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
})

// 9. BOOKINGS. GET /USER/ADMIN/BOOKINGS/:bookingId

app.get('/users/admin/:bookingId', isAuthorized, isAdmin, async (req, res) => {
    const { bookingId } = req.params

    let bookings
    try {
        bookings = await mysqlBookingsRepository.getAdminBookingsById(bookingId)
    } catch(error) {
        res.status(400)
        res.end(error.message)
    }

    res.status(200)
    res.send(bookings)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})