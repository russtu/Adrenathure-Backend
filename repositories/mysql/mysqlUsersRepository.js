const connection = require('./mysqlConnection')


const userExists = async (user) => {
    const result = await connection.query("SELECT * FROM users WHERE email = ?", [user.email])
    return !!result[0].length
}


const saveUser = async (user) => {
    let createdAt = new Date()
    const [results] = await connection.query("INSERT INTO users (email, password, firstName, lastName, createdAt, registrationCode) VALUES (?, ?, ?, ?, ?, ?)", [user.email, user.password, user.firstName, user.lastName, createdAt, user.registrationCode])

    const savedUser = {...user, id: results.insertId}
    return savedUser
}


const emailConfirmation = async ( registrationCode ) => {
    const [users] = await connection.query("SELECT * FROM users WHERE registrationCode = ?", [registrationCode])

    if (!users.length) {
        throw new Error()
    }

    const updatedUser = await connection.query("UPDATE users SET registrationCode = null, active = true WHERE id = ?", [users[0].id])
    return true
}


const getUserByEmail = async (userEmail) => {
    const result = await connection.query("SELECT * FROM users WHERE email = ?", [userEmail])
    return result[0] && result[0][0]
  }


const getUserById = async (userId) => {
    const result = await connection.query("SELECT * FROM users WHERE id = ?", [userId])
    return result[0][0]
}


const editUser = async (user, userId) => {
    const result = await connection.query("UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?", [user.firstName, user.lastName, user.email, user.password, userId])
}


module.exports = {
    saveUser,
    emailConfirmation,
    userExists,
    getUserByEmail,
    editUser,
    getUserById
}