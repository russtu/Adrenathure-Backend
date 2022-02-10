
const mysqlUsersRepository = require('../../repositories/mysql/mysqlUsersRepository')

const postUploadAvatar = async (req, res) => {
    const userId = req.user.id
    const avatar = req.files.avatar

    avatar.mv(`${__dirname}/../../public/${avatar.name}`)
    const path = `${avatar.name}`

    let savedPath
    try {
      savedPath = await mysqlUsersRepository.postAvatar(path,userId)
    } catch (error) {
      res.status(500)
      res.end('Database error')
      return
    }
    
    res.send('File uploaded successfully')
}

module.exports = postUploadAvatar
