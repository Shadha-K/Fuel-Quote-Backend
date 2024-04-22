const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pricing = require('./pricing');
const pool = require('../models/db');

function generateToken(username) {
    const secretKey = 'your_secret_key';
    const expiresIn = '1w'; 
    const token = jwt.sign({ username }, secretKey, { expiresIn });
    return token;
}

async function register(req, res) {
    const { username, password } = req.body;

    const selectQuery = 'SELECT * FROM user_credentials WHERE username = ?';
    const selectValues = [username];

    pool.query(selectQuery, selectValues, (error, results) => {
        if (error) {
            console.error('Error checking username:', error);
            return res.status(500).json({ error: 'Error checking username' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password' });
            }
            const token = generateToken(username); 
            const insertQuery = 'INSERT INTO user_credentials (username, password) VALUES (?, ?)';
            const insertValues = [username, hashedPassword];

            pool.query(insertQuery, insertValues, (error, results) => {
                if (error) {
                    console.error('Error registering user:', error);
                    return res.status(500).json({ error: 'Error registering user' });
                }
                
                return res.status(200).json({ message: 'User registered successfully', token });
            });
        });
    });
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const selectQuery = 'SELECT * FROM user_credentials WHERE username = ?';
        const selectValues = [username];

        pool.query(selectQuery, selectValues, async (error, results) => {
            if (error) {
                console.error('Error fetching user credentials:', error);
                return res.status(500).json({ error: 'Error fetching user credentials' });
            }

            if (results.length === 0) {
                console.log('User not found:', username);
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = generateToken(username);
                console.log('Login successful for user:', username);
                const redirectTo = user.profileComplete ? '/profile' : '/registration';
                return res.status(200).json({ token, redirectTo });
            } else {
                console.log('Invalid password for user:', username);
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updatePassword(req, res) {
    const { username, newPassword } = req.body;

    try {
        const selectQuery = 'SELECT * FROM user_credentials WHERE username = ?';
        const selectValues = [username];

        pool.query(selectQuery, selectValues, (selectError, selectResults) => {
            if (selectError) {
                console.error('Error checking username:', selectError);
                return res.status(500).json({ error: 'Error checking username' });
            }

            if (selectResults.length === 0) {
                return res.status(404).json({ error: 'Username not found' });
            }

            bcrypt.hash(newPassword, 10, async (hashError, hashedPassword) => {
                if (hashError) {
                    console.error('Error hashing new password:', hashError);
                    return res.status(500).json({ error: 'Error hashing new password' });
                }

                const updateQuery = 'UPDATE user_credentials SET password = ? WHERE username = ?';
                const updateValues = [hashedPassword, username];

                pool.query(updateQuery, updateValues, (updateError, updateResults) => {
                    if (updateError) {
                        console.error('Error updating password:', updateError);
                        return res.status(500).json({ error: 'Error updating password' });
                    }

                    return res.status(200).json({ message: 'Password updated successfully' });
                });
            });
        });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const completeProfile = async (req, res) => {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;
    const userAddress2 = address2 || ''; 

    try {
        const userExistsQuery = 'SELECT userID FROM user_credentials WHERE username = ?';
        const [userExistsRows, _] = await pool.promise().query(userExistsQuery, [username]);

        if (userExistsRows.length > 0) {
            const insertClientQuery = 'INSERT INTO client_information (username, userID, full_name, address_1, address_2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const userID = userExistsRows[0].userID;
            const insertClientValues = [username, userID, fullName, address1, userAddress2, city, state, zipcode];

            await pool.promise().query(insertClientQuery, insertClientValues);

            const updateCredentialsQuery = 'UPDATE user_credentials SET profileComplete = ? WHERE username = ?';
            const updateCredentialsValues = [true, username];
            await pool.promise().query(updateCredentialsQuery, updateCredentialsValues);

            console.log('Profile completed and registered successfully:', username);
            res.status(201).json({ message: 'Profile completed and registered successfully' });
        } else {
            console.error('User not found:', username);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error completing profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function getProfile(req, res) {
    try {
        const { username } = req.user;
        const query = 'SELECT username, full_name, address_1, address_2, city, state, zipcode FROM client_information WHERE username = ?';
        pool.query(query, [username], (error, results) => {
            if (error) {
                console.error('Error retrieving user profile:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User profile not found' });
            }
            const userProfile = results[0]; 
            return res.status(200).json(userProfile);
        });
    } catch (error) {
        console.error('Error retrieving profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res, userProfileData) {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;

    try {
        if (!username || !fullName || !address1 || !city || !state || !zipcode) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const query = 'UPDATE client_information SET full_name = ?, address_1 = ?, address_2 = ?, city = ?, state = ?, zipcode = ? WHERE username = ?';
        const values = [fullName, address1, address2 || '', city, state, zipcode, username];

        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Error updating user profile:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(200).json({
                username,
                fullName,
                address1,
                address2: address2 || '', 
                city,
                state,
                zipcode
            });
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function createQuote(req, res) {
    const { username, deliveryAddress, userState, deliveryDate } = req.body;
    const gallonsRequested = parseFloat(req.body.gallonsRequested);
    console.log("userState is ", userState);
    console.log(deliveryAddress);
    console.log("Attempting to create fuel quote for ", username);
    try {
        pool.query(
            'SELECT * FROM client_information WHERE username = ?',
            [username],
            async (error, clientResults) => {
                if (error) {
                    console.error('Error retrieving client information:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                const rateHistory = clientResults.length > 0;

                const pricing = new Pricing(userState, rateHistory, gallonsRequested);

                const pricePerGallon = pricing.calculatePricePerGallon();
                const totalAmountDue = pricing.calculateTotalPrice();
                console.log("Total amount due is ", totalAmountDue);

                const userID = clientResults.length > 0 ? clientResults[0].userID : null;

                const insertQuery = 'INSERT INTO fuel_quote (userID, gallons_requested, delivery_address, delivery_date, price_per_gallon, total_amount_due) VALUES (?, ?, ?, ?, ?, ?)';
                const insertValues = [userID, gallonsRequested, deliveryAddress, deliveryDate, pricePerGallon, totalAmountDue];

                pool.query(
                    insertQuery,
                    insertValues,
                    (error, results) => {
                        if (error) {
                            console.error('Error creating fuel quote:', error);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        const newQuote = {
                            quote_id: results.insertId,
                            userID,
                            gallonsRequested,
                            deliveryAddress,
                            deliveryDate,
                            pricePerGallon,
                            totalAmountDue
                        };
                        return res.status(201).json(newQuote);
                    }
                );
            }
        );
    } catch (error) {
        console.error('Error creating fuel quote:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getQuoteHistory(req, res) {
    const loggedInUsername = req.user.username;

    try {
        const selectQuery = 'SELECT * FROM fuel_quote WHERE userID = (SELECT userID FROM user_credentials WHERE username = ?) ORDER BY created_at DESC';
        const selectValues = [loggedInUsername];

        pool.query(
            selectQuery,
            selectValues,
            (error, results) => {
                if (error) {
                    console.error('Error retrieving fuel quote history:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(200).json(results);
            }
        );
    } catch (error) {
        console.error('Error retrieving fuel quote history:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function previewQuote(req, res) {
    const { username, userState, gallonsRequested } = req.body;

    try {
        const selectQuery = 'SELECT * FROM fuel_quote WHERE userID = (SELECT userID FROM user_credentials WHERE username = ?)';
        const selectValues = [username];
        pool.query(selectQuery, selectValues, async (error, quoteResults) => {
            if (error) {
                console.error('Error retrieving user quotes:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const rateHistory = quoteResults.length > 0;

            const pricing = new Pricing(userState, rateHistory, gallonsRequested);
            const pricePerGallon = pricing.calculatePricePerGallon();
            const totalAmountDue = pricing.calculateTotalPrice();

            return res.status(200).json({ pricePerGallon, totalAmountDue });
        });
    } catch (error) {
        console.error('Error previewing fuel quote:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    login,
    register,
    completeProfile,
    getProfile,
    updateProfile,
    createQuote,
    getQuoteHistory, 
    previewQuote,
    pool,
    updatePassword
};