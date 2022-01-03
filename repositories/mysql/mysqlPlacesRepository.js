const connection = require('./mysqlConnection')

const getPlaces = async () => {

        const places = await connection.query('SELECT * FROM places')
        return places[0]

}


const getPlacesRecommended = async () => {

        const places = await connection.query('SELECT * FROM places WHERE places.recommended = true')
        return places[0]

}


const getPlacesById = async (placeId) => {

        const places = await connection.query('SELECT * FROM places WHERE id = ?', [placeId])
        return places[0][0]

}


module.exports = {
    getPlaces,
    getPlacesRecommended,
    getPlacesById
}