const jwt = require('jsonwebtoken');

function validateLogin(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
   
  
    next(); 
  }

  function validateRegistration(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    next(); 
  }
 
  function validateProfileUpdate(req, res, next) {
    const { fullName, address1, city, state, zipcode } = req.body;
  
    if (!fullName || !address1 || !city || !state || !zipcode) {
      return res.status(400).json({ error: 'Full name, address, city, state, and zipcode are required' });
    }
    next(); 
  }
  function validateFuelQuote(req, res, next) {
    const { gallonsRequested, deliveryDate } = req.body;
  
    if (!gallonsRequested || !deliveryDate) {
      return res.status(400).json({ error: 'Gallons requested and delivery date are required' });
    }
  
    next(); 
  }

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }
    req.user = decodedToken;
    next(); 
  });
}

module.exports = {
  validateLogin,
  validateRegistration,
  validateProfileUpdate,
  validateFuelQuote,
  authenticate
};
