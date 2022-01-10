const express = require('express')


const isAdmin = (req, res, next) => {
    const { role } = req.user.role

    if (!role === 'admin') {
        res.status(401)
        res.end('You need administrator permissions to enter this zone')
        return
    }

    next()
}


module.exports = {
    isAdmin
}