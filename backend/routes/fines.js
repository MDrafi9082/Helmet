const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/check-fines', (req, res) => {
  const { numberPlate, phoneNumber } = req.body;

  const query = `SELECT * FROM fines WHERE numberPlate = ? AND phoneNumber = ?`;
  db.query(query, [numberPlate, phoneNumber], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0) {
      res.json({ fines: results });
    } else {
      res.status(404).json({ error: 'No fines found' });
    }
  });
});

module.exports = router;