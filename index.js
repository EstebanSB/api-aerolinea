const express = require('express');
const mysql = require('mysql');

const app = express();

// Conexion a la BD
//En lugar de utilizar createConnection, se utilizo createPool para gestionar un pool de conexiones. 
//esto mejora el rendimiento y la capacidad de manejar multiples solicitudes de manera recurrente.
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'airline',
});

// Funcion que ejecuta consultas en la bd, utilizando el pool de conexiones
function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Funcion para obtener los pasajeros de un vuelo
async function getPassengers(flightId) {
  const query = `
    SELECT * FROM flight
    INNER JOIN boarding_pass ON flight.flight_id = boarding_pass.flight_id
    INNER JOIN passenger ON boarding_pass.passenger_id = passenger.passenger_id
    WHERE flight.flight_id = ?
  `;
  // Manejo de errores por si los datos no los trae correctamente
  try {
    const results = await executeQuery(query, flightId);
    return results;
  } catch (error) {
    throw error;
  }
}

app.get('/flights/:id/passengers', async (req, res) => {
  try {
    const flightId = req.params.id;

    // Valida el campo flightId
    if (!flightId) {
      res.status(400).json({ code: 400, errors: 'Invalid flightId' });
      return;
    }

    // Obtiene los pasajeros del vuelo
    const results = await getPassengers(flightId);

    // Verifica si no se encuentras los resultados
    if (results.length === 0) {
      res.status(404).json({ code: 404, data: {} });
      return;
    }

    // Mapea los resultados a un arreglo de objetos de pasajeros
    const passengers = results.map((row) => ({
      passengerId: row.passenger_id,
      dni: row.dni,
      name: row.name,
      age: row.age,
      country: row.country,
      boardingPassId: row.boarding_pass_id,
      purchaseId: row.purchase_id,
      seatTypeId: row.seat_type_id,
      seatId: row.seat_id
    }));

    // Crea el objeto flightData con la informacion del vuelo y los pasajeros
    const flightData = {
      flightId: results[0].flight_id,
      takeoffDateTime: results[0].takeoff_date_time,
      takeoffAirport: results[0].takeoff_airport,
      landingDateTime: results[0].landing_date_time,
      landingAirport: results[0].landing_airport,
      airplaneId: results[0].airplane_id,
      passengers: passengers
    };

    // Envia la respuesta con codigo 200 junto con los datos del vuelo y los pasajeros
    res.status(200).json({ code: 200, data: flightData });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ code: 500, errors: 'Internal server error' });
  }
});

// Muestra por consola que el servidor se ha iniciado correctamente en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

