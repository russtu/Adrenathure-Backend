const express = require('express')
require('dotenv').config()









const app = express()

app.use(express.json())



const {BASE_URL, PORT } = process.env









app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})