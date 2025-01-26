const mysql = require('mysql2');

// Create a database connection pool
const db = mysql.createPool({
  host: 'localhost',    // Database host
  user: 'root',         // Database username
  password: 'Rafi#sql24',         // Database password
  database: 'vehicle_fines'    // Your database name
});

module.exports = db;  // Export the DB connection
