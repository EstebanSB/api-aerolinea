const express = require('express');
const mysql = require('mysql');

const app = express();

// Conexion a la BD
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'airline',
});

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

async function getPassengers(flightId) {
  const query = `
    SELECT * FROM flight
    INNER JOIN boarding_pass ON flight.flight_id = boarding_pass.flight_id
    INNER JOIN passenger ON boarding_pass.passenger_id = passenger.passenger_id
    WHERE flight.flight_id = ?
  `;
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

    if (!flightId) {
      res.status(400).json({ code: 400, errors: 'Invalid flightId' });
      return;
    }

    const results = await getPassengers(flightId);

    if (results.length === 0) {
      res.status(404).json({ code: 404, data: {} });
      return;
    }

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

    const flightData = {
      flightId: results[0].flight_id,
      takeoffDateTime: results[0].takeoff_date_time,
      takeoffAirport: results[0].takeoff_airport,
      landingDateTime: results[0].landing_date_time,
      landingAirport: results[0].landing_airport,
      airplaneId: results[0].airplane_id,
      passengers: passengers
    };

    res.status(200).json({ code: 200, data: flightData });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ code: 500, errors: 'Internal server error' });
  }
});

module.exports = app;
