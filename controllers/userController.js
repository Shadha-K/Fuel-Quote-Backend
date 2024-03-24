const jwt = require('jsonwebtoken');

const userProfiles = {
    user_name123: {
        username: 'user_name123',
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'City',
        state: 'ST',
        zipcode: '12345'
    },
    user2: {
        username: 'user2',
        fullName: 'Jane Smith',
        address1: '456 Elm St',
        address2: '',
        city: 'Town',
        state: 'ST',
        zipcode: '67890'
    }
};

const fuelQuoteData = [
    {
        username: 'user_name123',
        gallonsRequested: 50,
        deliveryAddress: '123 Main St City, ST 12345',
        deliveryDate: '3/18/2034',
        pricePerGallon: 2.13,
        totalAmountDue: 106.5

    },
    {
        username: 'user_name123',
        gallonsRequested: 45,
        deliveryAddress: '123 Main St City, ST 12345',
        deliveryDate: '3/24/18',
        pricePerGallon: 2.07,
        totalAmountDue: 100.8
    }
];

const validCredentials = [
    { username: "user_name123", password: "Password123!", profileComplete: true },
    { username: 'user2', password: 'password2@', profileComplete: true },
];

async function getProfile(req, res) {
    try {
        const { username } = req.user;
        const userProfile = userProfiles[username];
        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    const { fullName, address1, address2, city, state, zipcode } = req.body;

    try {
        // Validate data
        if (!fullName || !address1 || !city || !state || !zipcode) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Update userProfileData with the new profile information
        userProfileData.fullName = fullName;
        userProfileData.address1 = address1;
        userProfileData.address2 = address2;
        userProfileData.city = city;
        userProfileData.state = state;
        userProfileData.zipcode = zipcode;

        // Save the updated profile data to the database or wherever it's stored
        // Example: await userProfileData.save();

        // Respond with the updated profile data
        return res.status(200).json(userProfileData);
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



async function createQuote(req, res) {
    const { username, gallonsRequested, deliveryAddress, deliveryDate, pricePerGallon, totalAmountDue } = req.body;

    try {
        const newQuote = {
            username,
            gallonsRequested,
            deliveryAddress,
            deliveryDate,
            pricePerGallon,
            totalAmountDue
        };
        fuelQuoteData.push(newQuote);
        return res.status(201).json(newQuote);
    } catch (error) {
        console.error('Error creating fuel quote:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getQuoteHistory(req, res) {
    const loggedInUsername = req.user.username; 

    try {
        const userFuelQuotes = fuelQuoteData.filter(quote => quote.username === loggedInUsername);
        return res.status(200).json(userFuelQuotes);
    } catch (error) {
        console.error('Error retrieving fuel quote history:', error);
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
            validCredentials.push({ username, password, profileComplete: false }); 
            console.log('User registered successfully:', username);
            return res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = validCredentials.find(cred => cred.username === username && cred.password === password);
        if (user) {
            const token = generateToken(username);
            console.log('Login successful for user:', username);
            if (!user.profileComplete) {
                return res.status(200).json({ token, redirectTo: '/registration' }); 
            } else {
                return res.status(200).json({ token, redirectTo: '/profile' }); 
            }
        } else {
            console.log('Invalid credentials for user:', username);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function completeProfile(req, res) {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;
    const userAddress2 = address2 || ''; 

    try {
        const user = validCredentials.find(cred => cred.username === username);
        if (user) {
            user.profileComplete = true; 
            userProfiles[username] = {
                username,
                fullName,
                address1,
                address2,
                city,
                state,
                zipcode
            };
            console.log('Profile completed and registered successfully:', username);
            return res.status(201).json({ message: 'Profile completed and registered successfully' });
        } else {
            //console.error('User not found:', username);
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error completing profile:', error);
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
    completeProfile,
    createQuote,
    getQuoteHistory,
    login,
    register,
    fuelQuoteData,
    validCredentials,
    userProfiles
};