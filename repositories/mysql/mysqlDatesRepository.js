const connection = require('./mysqlConnection')

// const createPlace = async (placeData, path) => {
//   let results = await connection.query("INSERT INTO places (placeName, placeDescription, photo, coordsLong, coordsLat) VALUES ( ?, ?, ?, ?, ?)  " ,[placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat])
//   return results[0]
// }


// const editPlace = async (placeData, placeId,  path) => {
//   let results = await connection.query("UPDATE places SET placeName = ?, placeDescription = ?, photo = ?, coordsLong = ?, coordsLat = ? WHERE id = ? ", [placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat, placeId])
//   return results
// }


const getDateById = async (experienceId) => {
  const dates = await connection.query('SELECT * FROM dates WHERE experience_id = ?', [experienceId])
  return dates[0]
}


const getDates = async () => {

  const dates = await connection.query('SELECT * FROM dates')
  return dates[0]
}


// const getPlacesById = async (placeId) => {
//         const places = await connection.query('SELECT * FROM places WHERE id = ?', [placeId])
//         return places[0][0]
// }


module.exports = {
  getDateById,
  getDates
}

