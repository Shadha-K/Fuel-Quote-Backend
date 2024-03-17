// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware function to authenticate user requests
function authenticate(req, res, next) {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing authorization header' });
  }

  // Extract the JWT token from the authorization header
  const token = authHeader.split(' ')[1];

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }
    // Store the decoded token payload in the request object for further use
    req.user = decodedToken;
    next(); // Call the next middleware or route handler
  });
}

module.exports = {
  authenticate
};
