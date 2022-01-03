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




// 10. destinos. GET /places. Retorna: todos los places y los places donde recommended === true

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


// 11. destinos -> destino recomendado. GET /places/recommended . Retorna: todos los places destacados (recommeded === true) y el mapa

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


// 12. destinos -> destino en concreto. GET /places/:placeId. Retorna: todos place en concreto con las experiencias pertenecientes a ete destino

app.get('/places/:placeId', async (req, res) => {
    //const places = await mysqlPlacesRepository.getPlacesById(req.params.placeId)
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