const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')

const app = express()

app.use(express.json())

const { JWT_PRIVATE_KEY, JWT_EXPIRES_AFTER } = process.env


const postLogin = async (req, res) => {
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
      res.end('Invalid credentials')
      return
    }

    if (!await bcrypt.compare(credentials.password, user.password)) {
      res.status(401)
      res.end('Invalid credentials')
      return
    }

    if (user.active === 0) {
      res.status(409)
      res.end('Please activate your account')
      return
    }

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + Number(JWT_EXPIRES_AFTER),
      user: { id: user.id, role: user.role }
    }, JWT_PRIVATE_KEY);

    res.status(200)
    res.send({ token, user:user.firstName, role:user.role })
}

module.exports = postLogin