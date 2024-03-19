const jwt = require('jsonwebtoken');

const userProfileData = {
    username: 'user_name123',
    fullName: 'John Doe',
    address1: '123 Main St',
    address2: '',
    city: 'City',
    state: 'ST',
    zipcode: '12345'
};

const fuelQuoteData = [
    {
        gallonsRequested: 50,
        deliveryAddress: '123 Main St City, ST 12345',
        deliveryDate: '3/18/2034',
        pricePerGallon: 2.13,
        totalAmountDue: 106.5
    }
];

const validCredentials = [
    { username: "user_name123", password: "Password123!" },
    { username: 'user2', password: 'password2@' },
];

async function getProfile(req, res) {
    try {
        return res.status(200).json(userProfileData);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;

    try {
        userProfileData.username = username;
        userProfileData.fullName = fullName;
        userProfileData.address1 = address1;
        userProfileData.address2 = address2;
        userProfileData.city = city;
        userProfileData.state = state;
        userProfileData.zipcode = zipcode;

        return res.status(200).json(userProfileData);
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function createQuote(req, res) {
    const { gallonsRequested, deliveryDate } = req.body;

    try {
        const newQuote = {
            gallonsRequested,
            deliveryAddress,
        };
        fuelQuoteData.push(newQuote);
        return res.status(201).json(newQuote);
    } catch (error) {
        console.error('Error creating fuel quote:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getQuoteHistory(req, res) {
    try {
        return res.status(200).json(fuelQuoteData);
    } catch (error) {
        console.error('Error retrieving fuel quote history:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

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
    const expiresIn = '1w'; 
    const token = jwt.sign({ username }, secretKey, { expiresIn });
    return token;
}

module.exports = {
    getProfile,
    updateProfile,
    createQuote,
    getQuoteHistory,
    login,
    register
};
