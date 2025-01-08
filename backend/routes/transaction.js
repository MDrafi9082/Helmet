const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Make sure db.js is correctly set up

router.get('/', async (req, res) => {
  const { numberPlate, phoneNumber } = req.query;

  if (!numberPlate || !phoneNumber) {
    return res.status(400).json({ message: 'Both number plate and phone number are required.' });
  }

  try {
    const transactions = await db.query(
      'SELECT * FROM transactions WHERE numberPlate = ? AND phoneNumber = ?',
      [numberPlate, phoneNumber]
    );
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Something went wrong while fetching data.' });
  }
});

module.exports = router;