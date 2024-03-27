const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const db = require('./models/db');
require('dotenv').config();

app.use(cors());

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json()); 

app.use('/api/auth', userRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/fuel-quote', userRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
