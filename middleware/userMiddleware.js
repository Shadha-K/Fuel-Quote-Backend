const jwt = require('jsonwebtoken');

function validateLogin(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    else if (username.length < 4 || username.length > 20){
      return res.status(400).json({ error: 'Username must be between 4 and 20 characters' });
    }
    else if (!/^[a-zA-Z0-9_.-]+$/.test(username)){
      return res.status(400).json({ error: 'Invalid characters in username. Use only letters, numbers, dots, dashes, or underscores.' });
    }
    else if (password.length < 4 || password.length > 20){
      return res.status(400).json({ error: 'Password must be between 4 and 20 characters' });
    }
    else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(password)){
      return res.status(400).json({ error: 'Password must contain at least one letter, one number, and one special character' });
    }
    next(); 
  }

  function validateRegistration(req, res, next) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    else if (username.length < 4 || username.length > 20){
      return res.status(400).json({ error: 'Username must be between 4 and 20 characters' });
    }
    else if (!/^[a-zA-Z0-9_.-]+$/.test(username)){
      return res.status(400).json({ error: 'Invalid characters in username. Use only letters, numbers, dots, dashes, or underscores.' });
    }
    else if (password.length < 4 || password.length > 20){
      return res.status(400).json({ error: 'Password must be between 4 and 20 characters' });
    }
    else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(password)){
      return res.status(400).json({ error: 'Password must contain at least one letter, one number, and one special character' });
    }
  
    next(); 
  }
 
  function validateProfileUpdate(req, res, next) {
    const { fullName, address1, address2, city, state, zipcode } = req.body;
  
    if (!fullName || !address1 || !city || !state || !zipcode) {
      return res.status(400).json({ error: 'Full name, address, city, state, and zipcode are required' });
    }
    if (fullName.length > 50) {
      return res.status(400).json({ error: 'Full name must be 50 characters or less' });
    }
    if (address1.length > 100) {
      return res.status(400).json({ error: 'Address 1 must be 100 characters or less' });
    }
    if (address2 && address2.length > 100) {
      return res.status(400).json({ error: 'Address 2 must be 100 characters or less' });
    }
    if (city.length > 100) {
      return res.status(400).json({ error: 'City must be 100 characters or less' });
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
  else if (fullName.length > 50) {
    return res.status(400).json({ error: 'Full name must be 50 characters or less' });
  }
  else if (address1.length > 100) {
    return res.status(400).json({ error: 'Address 1 must be 100 characters or less' });
  }
  else if (address2 && address2.length > 100) {
    return res.status(400).json({ error: 'Address 2 must be 100 characters or less' });
  }
  else if (city.length > 100) {
    return res.status(400).json({ error: 'City must be 100 characters or less' });
  }
  else if (zipcode.length < 5 || zipcode.length > 9) {
    return res.status(400).json({ error: 'Zipcode must be between 5 and 9 digits long' });
  }
  else if (!/^\d+$/.test(zipcode)) {
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
