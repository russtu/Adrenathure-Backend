const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_PRIVATE_KEY } = process.env


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


module.exports = {
    isAuthorized
}