// validationMiddleware.js

// Middleware function to validate login request data
function validateLogin(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // Add additional validation logic as needed
  
    next(); 
  }
  
  // Middleware function to validate registration request data
  function validateRegistration(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // Add additional validation logic as needed
  
    next(); // Call the next middleware or route handler
  }
  
  // Middleware function to validate profile update request data
  function validateProfileUpdate(req, res, next) {
    const { fullName, address1, city, state, zipcode } = req.body;
  
    if (!fullName || !address1 || !city || !state || !zipcode) {
      return res.status(400).json({ error: 'Full name, address, city, state, and zipcode are required' });
    }
  
    // Add additional validation logic as needed
  
    next(); // Call the next middleware or route handler
  }
  
  // Middleware function to validate fuel quote request data
  function validateFuelQuote(req, res, next) {
    const { gallonsRequested, deliveryDate } = req.body;
  
    if (!gallonsRequested || !deliveryDate) {
      return res.status(400).json({ error: 'Gallons requested and delivery date are required' });
    }
  
    // Add additional validation logic as needed
  
    next(); // Call the next middleware or route handler
  }
  
  module.exports = {
    validateLogin,
    validateRegistration,
    validateProfileUpdate,
    validateFuelQuote
  };
  