const express = require('express')
require('dotenv').config()
const mysqlUsersRepository = require('./repositories/mysql/mysqlUsersRepository')




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







app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})