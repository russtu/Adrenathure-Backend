const express = require('express')
const router = require('express').Router()
const crypto = require("crypto")
const bcrypt = require('bcrypt')

const fileUpload = require('express-fileupload')
require('dotenv').config()

const mysqlUsersRepository = require('../repositories/mysql/mysqlUsersRepository')
const userSchema = require('../validationSchemas/userSchema')


const app = express()

app.use(express.json())

app.use('/public', express.static('uploads'))
app.use(fileUpload())

const { isAuthorized } = require('../middlewares')
const { postRegister, getEmailValidation, postLogin, getUserById, putEditUser, postUploadAvatar } = require('../controllers')




//USER REGISTRATION

router.post('/', postRegister)

// EMAIL VALIDATION

router.get('/validate/:registrationCode', getEmailValidation)


// LOGIN

router.post('/login', postLogin)

// GET USER BY ID

router.get('/profile',isAuthorized, getUserById)


// EDIT USER

router.put('/', isAuthorized,  putEditUser)


// AVATAR UPLOAD

router.post('/uploads', isAuthorized, postUploadAvatar)


module.exports = router

