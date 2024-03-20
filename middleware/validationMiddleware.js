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

  function validateCompleteProfile(req, res, next) {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    if (!fullName) {
      return res.status(400).json({ error: 'Full name is required' });
    }
  
    if (!address1) {
      return res.status(400).json({ error: 'Address 1 is required' });
    }
  
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
  
    if (!state) {
      return res.status(400).json({ error: 'State is required' });
    }
  
    if (!zipcode) {
      return res.status(400).json({ error: 'Zipcode is required' });
    }

    next();
  }  
  
  module.exports = {
    validateLogin,
    validateRegistration,
    validateProfileUpdate,
    validateFuelQuote,
    validateCompleteProfile
  };
  