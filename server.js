const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config(); // Load environment variables

app.use(cors());

// Import route files
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const fuelQuoteRoutes = require('./routes/fuelQuoteRoutes');

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
// Add any additional middleware here

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/fuel-quote', fuelQuoteRoutes);
// Add any additional routes here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
