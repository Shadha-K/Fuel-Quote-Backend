const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config(); 

app.use(cors());

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json()); 

app.use('/api/auth', userRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/fuel-quote', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
