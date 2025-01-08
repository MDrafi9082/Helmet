const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all domains
app.use(cors());

// Optionally, you can restrict it to specific origins (e.g., React running on port 3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from localhost:3000
  methods: ['GET', 'POST'],
  credentials: true // Allow cookies if needed
}));

// Rest of your server setup (routes, etc.)
app.use(express.json());

// Define routes
app.post('/api/auth/login', (req, res) => {
  // Handle login logic
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});