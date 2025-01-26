// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs'); // To hash passwords if you're storing them securely
const jwt = require('jsonwebtoken'); // To issue JWT tokens for authentication
const db = require('../config/db'); // MySQL connection
const router = express.Router();

// Secret key for JWT (can be stored in environment variables for security)
const JWT_SECRET = 'your_secret_key_here'; // Update with a strong secret

// Login Route: Validates user credentials and returns a JWT if valid
router.post('/login', async (req, res) => {
  const { numberPlate, phoneNumber } = req.body;

  try {
    // Query to check if the user exists in the fines/vehicle database
    const query = `SELECT f.numberPlate, f.phoneNumber, v.vehicleName
                   FROM fines f
                   JOIN vehicles v ON f.numberPlate = v.numberPlate
                   WHERE f.numberPlate = ? AND f.phoneNumber = ?`;

    // Execute the query
    const [user] = await db.promise().query(query, [numberPlate, phoneNumber]);

    if (user.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }

    // If the user exists, generate a JWT token
    const token = jwt.sign(
      { numberPlate: user[0].numberPlate, phoneNumber: user[0].phoneNumber },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return success response with the token
    res.json({
      success: true,
      message: 'Login successful',
      token,
      vehicleName: user[0].vehicleName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Middleware to verify JWT and protect certain routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied' });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user info to the request object
    next(); // Move to the next middleware or route
  } catch (err) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

// Example of a protected route that requires JWT verification
router.get('/profile', verifyToken, async (req, res) => {
  const { numberPlate } = req.user; // Get user data from JWT

  try {
    // Query to fetch user details from the database (you can fetch more info as needed)
    const query = `SELECT numberPlate, vehicleName FROM vehicles WHERE numberPlate = ?`;
    const [userProfile] = await db.promise().query(query, [numberPlate]);

    if (userProfile.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, userProfile: userProfile[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;