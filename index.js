const crypto = require("crypto")
const express = require('express')
const bcrypt = require('bcrypt')
require('dotenv').config()
const mysqlUsersRepository = require('./repositories/mysql/mysqlUsersRepository')
const userSchema = require('./validationSchemas/userSchema')
const emailSender = require('./notifiers/emailSender')
const mysqlPlacesRepository = require('./repositories/mysql/mysqlPlacesRepository')
const mysqlExperiencesRepository = require('./repositories/mysql/mysqlExperiencesRepository')
const experienceSchema = require('./validationSchemas/experienceSchema')



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

// LOGIN
app.post('/auth/login', async (req, res) => {
    const credentials = req.body

    if (!credentials.email || !credentials.password) {
      res.status(400)
      res.end('You should provide an email and password')
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
      exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_AFTER,
      user: { id: user.id }
    }, JWT_PRIVATE_KEY);

    res.status(200)
    res.send({ token })
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

//GET EXPERIENCES BY ID
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

// CREATE NEW EXPERIENCES
app.post('/experiences', async (req, res) => {

    const experienceData = req.body
    console.log(experienceData)
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
app.put('/experiences/:experienceId', async (req, res) => {
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

// BARRA DE BUSQUEDA
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

   

// PLACES. GET /places
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


// PLACES. GET /places/recommended
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


// PLACES. GET /places/:placeId
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