const express = require('express')
const bcrypt = require('bcrypt')
require('dotenv').config()

const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')
const userSchema = require('../../validationSchemas/userSchema')
const userSchemaPass = require('../../validationSchemas/userSchemaPass')

const app = express()

app.use(express.json())

const { SALT_ROUNDS } = process.env


const putEditUser = async (req, res) => {
  const userId = req.user.id
  const user = req.body
  let encryptedPassword

  if (user.password) {
    try {
      await userSchemaPass.validateAsync(user)
    } catch (error) {
      res.status(422)
      res.end(error.message)
      return
    }

    try {
      encryptedPassword = await bcrypt.hash(user.password, Number(SALT_ROUNDS))
    } catch (error) {
      res.status(500)
      res.end('Unexpected error')
      return
    }
  } else {
    try {
      await userSchema.validateAsync(user)
    } catch (error) {
      res.status(422)
      res.end(error.message)
      return
    }
  }

  let editedUser
  try {
    editedUser = await mysqlUsersRepository.editUser({ ...user, password: encryptedPassword }, userId)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  res.status(200)
  res.end('User data edited successfully')
}

module.exports = putEditUser
