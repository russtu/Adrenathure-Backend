const postUploadAvatar = (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../uploads/${userId}-${avatar.name}`)

    res.send('File uploaded successfully')
}

module.exports = postUploadAvatar
