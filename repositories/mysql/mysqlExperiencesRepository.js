const connection = require('./mysqlConnection')


const createExperience = async (experienceData) => {
    
    let results = await connection.query("INSERT INTO experiences (experienceName, experienceDescription, price, totalSeats, experienceDate, place_id) VALUES ( ?, ?, ?, ?, ?, ? )  " ,[experienceData.experienceName, experienceData.experienceDescription, experienceData.price, experienceData.totalSeats, experienceData.experienceDate, experienceData.place_id])
    return results[0]

  }

const getExperienceById = async(experienceId) => {
    let results = await connection.query("SELECT * FROM experiences WHERE id= ? ",[experienceId])
    return results[0]

}
const getExperiences = async() => {

  let results = await connection.query("SELECT * FROM experiences")
  return results[0]

}
const editExperience = async (experienceData, experienceId) => {
    let results = await connection.query("UPDATE experiences SET experienceName = ?, experienceDescription = ?, price = ?, totalSeats = ?, experienceDate = ?, place_id = ? WHERE id = ?", [experienceData.experienceName, experienceData.experienceDescription, experienceData.price, experienceData.totalSeats, experienceData.experienceDate, experienceData.place_id, experienceId.id])
    return {experienceData}

  }

  const searchExperiences = async (place, date, lowPrice, highPrice) => {
   
    let placeresult
    let placeid
    if (place) {
      placeresult = await connection.query("SELECT * FROM places where placeName = ?", [place])
      placeid = placeresult[0][0].id
    }
    let results
    const params = []
    const conditions = []
    let query = "SELECT * FROM experiences "
    if (place || date || lowPrice || highPrice) {
      query += "WHERE "
    }
    if (place) {
      conditions.push("place_id = ?")
      params.push(placeid)
    }
    if (date) {
      conditions.push("experienceDate = ?")
      params.push(date)
    }
    if (lowPrice && highPrice) {
      conditions.push("price BETWEEN ? AND ?")
      params.push(lowPrice)
      params.push(highPrice)
    } else if (lowPrice) {
      conditions.push("price > ?")
      params.push(lowPrice)
    } else if (highPrice) {
      conditions.push("price < ?")
      params.push(highPrice)
     }

    query += conditions.join(" AND ")
    results = await connection.query(query, params)

    return results[0]

  }
module.exports = {
    getExperiences,
    getExperienceById,
    createExperience,
    editExperience,
    searchExperiences
}