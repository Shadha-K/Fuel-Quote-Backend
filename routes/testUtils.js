const express = require('express');
const userRoutes = require('../routes/userRoutes');

const createTestApp = () => {
  const app = express();
  
  app.use(express.json()); 
  
  app.use('/api', userRoutes); 
  
  return app;
};

module.exports = {
  createTestApp
};
