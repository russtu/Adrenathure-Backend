const express = require('express')


const isAdmin = (req, res, next) => {
    const { role } = req.user.role
    // cambiar el mensaje por 'you are not authorized'
    if (!role === 'admin') {
        res.status(403)
        res.end('You need administrator permissions to enter this zone')
        return
    }

    next()
}


module.exports = {
    isAdmin
}