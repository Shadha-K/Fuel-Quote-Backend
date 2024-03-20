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
    const { fullName, address1, address2, city, state, zipcode } = req.body;
  
    if (!fullName || !address1 || !city || !state || !zipcode) {
      return res.status(400).json({ error: 'Full name, address, city, state, and zipcode are required' });
    }

    if (fullName.trim() === '') {
      return res.status(400).json({ error: 'Full Name is required' });
    }
    if (fullName.length > 50) {
      return res.status(400).json({ error: 'Full name must be 50 characters or less' });
    }
  
    if (address1.trim() === '') {
      return res.status(400).json({ error: 'Address 1 is required' });
    }
    if (address1.length > 100) {
      return res.status(400).json({ error: 'Address 1 must be 100 characters or less' });
    }
  
    if (address2 && address2.length > 100) {
      return res.status(400).json({ error: 'Address 2 must be 100 characters or less' });
    }
  
    if (city.trim() === '') {
      return res.status(400).json({ error: 'City is required' });
    }
    if (city.length > 100) {
      return res.status(400).json({ error: 'City must be 100 characters or less' });
    }
  
    if (state.trim() === '') {
      return res.status(400).json({ error: 'State is required' });
    }
  
    if (zipcode.trim() === '') {
      return res.status(400).json({ error: 'Zipcode is required' });
    }
    if (zipcode.length < 5 || zipcode.length > 9) {
      return res.status(400).json({ error: 'Zipcode must be between 5 and 9 digits long' });
    }
    if (!/^\d+$/.test(zipcode)) {
      return res.status(400).json({ error: 'Zipcode must be digits only' });
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

function validateCompleteProfile(req, res, next) {
  const { username, fullName, address1, address2, city, state, zipcode } = req.body;

  if (!username || !fullName || !address1 || !city || !state || !zipcode) {
    return res.status(400).json({ error: 'Username, full name, address, city, state, and zipcode are required' });
  }

  if (fullName.trim() === '') {
    return res.status(400).json({ error: 'Full Name is required' });
  }
  if (fullName.length > 50) {
    return res.status(400).json({ error: 'Full name must be 50 characters or less' });
  }

  if (address1.trim() === '') {
    return res.status(400).json({ error: 'Address 1 is required' });
  }
  if (address1.length > 100) {
    return res.status(400).json({ error: 'Address 1 must be 100 characters or less' });
  }

  if (address2 && address2.length > 100) {
    return res.status(400).json({ error: 'Address 2 must be 100 characters or less' });
  }

  if (city.trim() === '') {
    return res.status(400).json({ error: 'City is required' });
  }
  if (city.length > 100) {
    return res.status(400).json({ error: 'City must be 100 characters or less' });
  }

  if (state.trim() === '') {
    return res.status(400).json({ error: 'State is required' });
  }

  if (zipcode.trim() === '') {
    return res.status(400).json({ error: 'Zipcode is required' });
  }
  if (zipcode.length < 5 || zipcode.length > 9) {
    return res.status(400).json({ error: 'Zipcode must be between 5 and 9 digits long' });
  }
  if (!/^\d+$/.test(zipcode)) {
    return res.status(400).json({ error: 'Zipcode must be digits only' });
  }

  next();
}

module.exports = {
  validateLogin,
  validateRegistration,
  validateProfileUpdate,
  validateFuelQuote,
  validateCompleteProfile,
  authenticate
};
