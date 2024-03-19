const jwt = require('jsonwebtoken');

const validCredentials = [
    { username: "user_name123", password: "Password123!" },
    { username: 'user2', password: 'password2@' },
  ];

  async function login(req, res) {
    const { username, password } = req.body;
  
    try {
      const isValidUser = validCredentials.some(cred => cred.username === username && cred.password === password);
      
      if (isValidUser) {
        const token = generateToken(username);
        console.log('Login successful for user:', username);
        res.header('Authorization', `Bearer ${token}`);
        return res.status(200).json({ token });
      } else {
        console.log('Invalid credentials for user:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

    async function register(req, res) {
        const { username, password } = req.body;
    
        try {
            const isUsernameTaken = validCredentials.some(cred => cred.username === username);
    
            if (isUsernameTaken) {
                console.log('Username already taken:', username);
                return res.status(409).json({ error: 'Username already taken' });
            } else {
                validCredentials.push({ username, password });
                console.log('User registered successfully:', username);
                return res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    

  function generateToken(username) {
    const secretKey = 'your_secret_key';
    const expiresIn = '1d'; 
    const token = jwt.sign({ username }, secretKey, { expiresIn });
    return token;
  }
  
  module.exports = {
      login,
      register
  };
  