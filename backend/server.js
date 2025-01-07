// server.js (backend folder)
const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());  // To parse JSON bodies
app.use(cors());          // To handle cross-origin requests

// Route to handle login and store data in SQL
app.post('/login', (req, res) => {
  const { numberPlate, phoneNumber } = req.body;

  // SQL query to insert data into the database
  const query = `INSERT INTO fines (numberPlate, phoneNumber) VALUES (?, ?)`;
  
  db.query(query, [numberPlate, phoneNumber], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data into database' });
    }
    res.status(200).json({ message: 'Data stored successfully', result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Connected to MySQL database.');
});
