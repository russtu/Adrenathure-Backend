const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())

app.use('/public', express.static('uploads'))
app.use(fileUpload())


const postUploadAvatar = (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const avatar = req.files.avatar

    avatar.mv(`../../uploads/${userId}-${avatar.name}`)

    res.send('File uploaded successfully')
}

module.exports = postUploadAvatar
