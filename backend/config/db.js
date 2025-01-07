// db.js (backend/config folder)
const mysql = require('mysql2');

// Create connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // MySQL username
  password: 'Rafi#sql24',  // MySQL password
  database: 'vehicle_fines'  // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db;
