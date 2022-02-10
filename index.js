const cors = require('cors')
const express = require('express')
require('dotenv').config()
const  { usersRoutes } = require('./routes')
const  { experiencesRoutes }  = require('./routes')
const  { placesRoutes }  = require('./routes')
const  { bookingsRoutes }  = require('./routes')
const  { reviewsRoutes }  = require('./routes')

const fileUpload = require('express-fileupload')

process.env.TZ = "Europa/Amsterdam"

const app = express()

app.use(express.json())

app.use(express.static('public'))
app.use(fileUpload())
app.use(cors())



// CONSTANTES
const { BASE_URL, PORT} = process.env

// ROUTES
app.use('/users', usersRoutes)

app.use('/experiences', experiencesRoutes)

app.use('/places', placesRoutes)

app.use('/bookings', bookingsRoutes)

app.use('/reviews', reviewsRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})
