const getDB = require('./getDB');
const faker = require('faker/locale/es');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { format } = require('date-fns');

// Función para formatear una fecha.
function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

// Función que me retorna un valor aleatorio entre un valor mínimo
// y un valor máximo.
function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

async function main() {
  // Declaramos la variable fuera del bloque "try" para poder acceder
  // a ella en el bloque "finally".
  let connection;

  try {
    // Intentamos obtener una conexión libre con la base de datos.
    connection = await getDB();

    // Eliminamos las tablas existentes.
    await connection.query('DROP TABLE IF EXISTS bookings');
    await connection.query('DROP TABLE IF EXISTS dates');
    await connection.query('DROP TABLE IF EXISTS experiences');
    await connection.query('DROP TABLE IF EXISTS places');
    await connection.query('DROP TABLE IF EXISTS reviews');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Tablas eliminadas');

    // Crear tabla de usuarios.
    await connection.query(`
            CREATE TABLE users (
                 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  email VARCHAR(100) UNIQUE NOT NULL,
		  password VARCHAR(100) NOT NULL,
		  firstName VARCHAR(50) NOT NULL,
		  lastName VARCHAR(100) NOT NULL,
		  avatar VARCHAR(100),
		  active BOOLEAN DEFAULT false,
		  role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
		  registrationCode VARCHAR(100),
		  recoverCode VARCHAR(100),
		  createdAt DATETIME NOT NULL
            )
        `);

    // Crear la tabla de entradas.
    await connection.query(`
            CREATE TABLE adrenathure.places (
		  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  recommended BOOLEAN DEFAULT false,
		  photo VARCHAR(100),
		  placeName VARCHAR(50) NOT NULL,
		  placeDescription TEXT NOT NULL
		)
        `);

    // Crear la tabla de fotos.
    await connection.query(`
          CREATE TABLE adrenathure.experiences (
		  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  experienceName VARCHAR(50) NOT NULL,
		  experienceDescription TEXT NOT NULL,
		  price INT NOT NULL,
		  totalSeats INT NOT NULL,
		  active BOOLEAN DEFAULT false,
		  experienceDate DATETIME NOT NULL,
		  photo VARCHAR(100),
		  experienceHour VARCHAR(100) NOT NULL,
		  place_id INT UNSIGNED NOT NULL,
		  FOREIGN KEY (place_id) REFERENCES places(id)
		)
        `);

    // Crear la tabla de votos.
    await connection.query(`
          CREATE TABLE adrenathure.bookings (
		  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  bookingDate DATETIME NOT NULL,
		  reservedSeats INT UNSIGNED NOT NULL,
		  totalPrice INT UNSIGNED NULL,
		  bookingNumber INT UNSIGNED NOT NULL,
		  experience_id INT UNSIGNED NOT NULL,
		  user_id INT UNSIGNED NOT NULL,
		  FOREIGN KEY (experience_id) REFERENCES experiences(id)
		  ON DELETE CASCADE,
		  FOREIGN KEY (user_id) REFERENCES users(id)
		)
        `);

    await connection.query(`
	  CREATE TABLE adrenathure.reviews (
		  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  vote  TINYINT UNSIGNED NOT NULL,
		  createdAt DATETIME NOT NULL,
		  booking_id INT UNSIGNED NOT NULL,
		  FOREIGN KEY (booking_id) REFERENCES bookings(id)
		  ON DELETE CASCADE
		)
        `);

    await connection.query(`
	  CREATE TABLE adrenathure.dates (
		  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  experienceDate DATETIME NOT NULL,
		  experienceHour TIME NOT NULL,
		  totalSeats INT NOT NULL,
		  availableSeats INT DEFAULT NULL,
		  experience_id INT UNSIGNED NOT NULL,
		  FOREIGN KEY (experience_id) REFERENCES experiences(id)
		)
        `);

    console.log('Tablas creadas');

    // Encriptamos la contraseña del administrador.
    const ADMIN_PASS = await bcrypt.hash('123456', saltRounds);

    // Insertamos el usuario administrador.
    await connection.query(`
            INSERT INTO users (email, password, firstName, lastName, active, role, createdAt)
            VALUES (
                "adrenathure@gmail.com",
                "${ADMIN_PASS}",
                "Admin",
                "Admin",
                true,
                "admin",
                "${formatDate(new Date())}"
            )
        `);

    // Constante que nos dice el nº de usuarios fake que vamos a crear.
    const USERS = 10;

    // Insertamos los usuarios.
    for (let i = 0; i < USERS; i++) {
      // Datos de faker.
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const password = await bcrypt.hash('123456', saltRounds);

      await connection.query(`
                INSERT INTO users (email, password, firstName, lastName, active, createdAt)
                VALUES (
                    "${email}",
                    "${password}",
                    "${firstName}",
                    "${lastName}",
                    true,
                    "${formatDate(new Date())}"
                )
            `);
    }

    console.log('Usuarios creados');


    // Constante que indica el nº de entradas que vamos a crear.
    const PLACES = 10;

    // Insertamos las entradas.
    for (let i = 0; i < PLACES; i++) {
      // Datos de faker.
      const placeName = faker.name.findName();
      const placeDescription = faker.lorem.paragraph();


      await connection.query(`
                INSERT INTO places (placeName, placeDescription)
                VALUES (
                    "${placeName}",
                    "${placeDescription}",
                )
            `);
    }

    console.log('Destinos creados');



    // Constante que indica el nº de entradas que vamos a crear.
    const DATES = 10;

    // Insertamos las entradas.
    for (let i = 0; i < DATES; i++) {
      // Datos de faker.
      const experienceDate = faker.date.soon(30);
      const experienceHour = faker.datatype.datetime();
      const totalSeats = getRandomValue(5, 20);


      await connection.query(`
                INSERT INTO places (experienceDate, experienceHour, totalSeats)
                VALUES (
                    "${experienceDate}",
                    "${experienceHour}",
                    "${totalSeats}",
                )
            `);
    }

    console.log('Fechas creados');




    // Constante que indica el nº de entradas que vamos a crear.
    const EXPERIENCES = 15;

    // Insertamos las entradas.
    for (let i = 0; i < EXPERIENCES; i++) {
      // Datos de faker.
      const experienceName = faker.name.findName();
      const experienceDescription = faker.lorem.paragraph();
      const place_id = getRandomValue(2, 11);
      const price = getRandomValue(200, 1000);

      await connection.query(`
                INSERT INTO entries (experienceName, experienceDescription, place_id, price)
                VALUES (
                    "${experienceName}",
                    "${experienceDescription}",
                    "${place_id}",
                    "${price}"
                )
            `);
    }

    console.log('Experiencias creadas');
  } catch (err) {
    console.error(err);
  } finally {
    // Si existe una conexión con la base de datos la liberamos.
    if (connection) connection.release();

    // Cerramos el proceso actual.
    process.exit(0);
  }
}

main();
