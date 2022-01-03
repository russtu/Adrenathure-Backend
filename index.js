const express = require('express')
require('dotenv').config()
const mysqlUsersRepository = require('./repositories/mysql/mysqlUsersRepository')
const mysqlPlacesRepository = require('./repositories/mysql/mysqlPlacesRepository')


const app = express()

app.use(express.json())


// CONSTANTES
const {BASE_URL, PORT } = process.env

// MIDDLEWARES
// ===========
app.post('/users', async (req, res) => {
    const user = req.body

    // try {
    //     await userSchema.validateAsync(user)
    // } catch (error) {
    //     res.status(404)
    //     res.end(error.message)
    //     return
    // }

    if (!user) {
        res.status(400)
        res.end('You should provide valid user data.')
        return
    }

    let savedUser
    try {
        savedUser = await mysqlUsersRepository.saveUser(user)
    } catch (error) {
       res.status(500)
       res.end('Database error')
       return
    }

    res.status(200)
    res.send(savedUser)
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