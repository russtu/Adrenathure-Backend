const connection = require('./mysqlConnection')

const createPlace = async (placeData, path) => {
  let results = await connection.query("INSERT INTO places (placeName, placeDescription, photo, coordsLong, coordsLat) VALUES ( ?, ?, ?, ?, ?)  " ,[placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat])
  return results[0]
}


const editPlace = async (placeData, placeId,  path) => {
  let results = await connection.query("UPDATE places SET placeName = ?, placeDescription = ?, photo = ?, coordsLong = ?, coordsLat = ? WHERE id = ? ", [placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat, placeId])
  return results
}


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
    createPlace,
    editPlace,
    getPlaces,
    getPlacesRecommended,
    getPlacesById
}