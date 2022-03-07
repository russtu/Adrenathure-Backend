const connection = require('./mysqlConnection')

const createPlace = async (placeData, path) => {
  let results
  if (path) {
    results = await connection.query("INSERT INTO places (placeName, placeDescription, photo, coordsLong, coordsLat) VALUES ( ?, ?, ?, ?, ?)  ", [placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat])
  } else {
    results = await connection.query("INSERT INTO places (placeName, placeDescription, coordsLong, coordsLat) VALUES ( ?, ?, ?, ?)  ", [placeData.placeName, placeData.placeDescription, placeData.coordsLong, placeData.coordsLat])

  }
  return results
}


const editPlace = async (placeData, placeId, path) => {
  let results
  if (path) { 
     results = await connection.query("UPDATE places SET placeName = ?, placeDescription = ?, photo = ?, coordsLong = ?, coordsLat = ? WHERE id = ? ", [placeData.placeName, placeData.placeDescription, path, placeData.coordsLong, placeData.coordsLat, placeId])

  } else {
    results = await connection.query("UPDATE places SET placeName = ?, placeDescription = ?, coordsLong = ?, coordsLat = ? WHERE id = ? ", [placeData.placeName, placeData.placeDescription, placeData.coordsLong, placeData.coordsLat, placeId])

  }
 
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

const deletePlace = async (placeId) => {
  let results = await connection.query("DELETE FROM places WHERE id = ? ", [placeId])
  return results[0]
}


module.exports = {
  createPlace,
  editPlace,
  getPlaces,
  getPlacesRecommended,
  getPlacesById,
  deletePlace
}