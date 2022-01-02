const connection = require('./mysqlConnection')

const saveUser = async (user) => {
    let createdAt = new Date()
    const results = await connection.query("INSERT INTO users (email, password, firstName, lastName, createdAt) VALUES (?, ?, ?, ?, ?)", [user.email, user.password, user.firstName, user.lastName, createdAt])

    const newUser = {...user, id: results[0].insertId}
    return newUser
}


module.exports = {
    saveUser
}