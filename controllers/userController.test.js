const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');
const userController = require('../controllers/userController');
const Pricing = require('./pricing');

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn((password, salt, callback) => callback(null, 'hashedPassword'))
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken')
}));

describe('User Controller', () => {
    describe('register', () => {
        it('should register a user successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, []);
                } else if (query.startsWith('INSERT')) {
                    callback(null, []);
                }
            });

            await userController.register(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('testpassword123@', 10, expect.any(Function));
            expect(jwt.sign).toHaveBeenCalledWith({ username: 'testuser' }, 'your_secret_key', { expiresIn: '1w' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', token: 'mockedToken' });

            mockQuery.mockRestore();
        });

        it('should return an error if username is already taken', async () => {
            const req = {
                body: {
                    username: 'existinguser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ username: 'existinguser' }]);
                }
            });

            await userController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Username is already taken' });

            mockQuery.mockRestore();
        });

        it('should return an error if there is an error checking username', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(new Error('DB error'));
                }
            });

            await userController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error checking username' });

            mockQuery.mockRestore();
        });

        it('should return an error if there is an error hashing password', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, []);
                }
            });

            bcrypt.hash.mockImplementationOnce((password, salt, callback) => callback(new Error('Hashing error')));

            await userController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error hashing password' });

            mockQuery.mockRestore();
        });

    });

    describe('login', () => {
        it('should login a user successfully with correct credentials', async () => {
            const req = {
                body: {
                    username: 'existinguser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ username: 'existinguser', password: 'hashedPassword', profileComplete: true }]);
                }
            });

            bcrypt.compare.mockReturnValueOnce(true);

            await userController.login(req, res);

            expect(jwt.sign).toHaveBeenCalledWith({ username: 'existinguser' }, 'your_secret_key', { expiresIn: '1w' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken', redirectTo: '/profile' });

            mockQuery.mockRestore();
        });

        it('should return an error if username is not found', async () => {
            const req = {
                body: {
                    username: 'nonexistentuser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, []);
                }
            });

            await userController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });

            mockQuery.mockRestore();
        });

        it('should return an error if password is incorrect', async () => {
            const req = {
                body: {
                    username: 'existinguser',
                    password: 'wrongpassword'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ username: 'existinguser', password: 'hashedPassword' }]);
                }
            });

            bcrypt.compare.mockReturnValueOnce(false);

            await userController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });

            mockQuery.mockRestore();
        });

        it('should return an error if there is an error fetching user credentials', async () => {
            const req = {
                body: {
                    username: 'existinguser',
                    password: 'testpassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(new Error('DB error'));
                }
            });

            await userController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching user credentials' });

            mockQuery.mockRestore();
        });
    });
    
    describe('completeProfile', () => {
        it('should complete profile and register successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    fullName: 'John Doe',
                    address1: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ userID: 1 }]);
                } else if (query.startsWith('INSERT')) {
                    callback(null, []);
                } else if (query.startsWith('UPDATE')) {
                    callback(null, []);
                }
            });
    
            await userController.completeProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Profile completed and registered successfully' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if user is not found', async () => {
            const req = {
                body: {
                    username: 'nonexistentuser',
                    fullName: 'John Doe',
                    address1: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, []);
                }
            });
    
            await userController.completeProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error completing profile', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    fullName: 'John Doe',
                    address1: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(new Error('DB error'));
                }
            });
    
            await userController.completeProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });  
    
    describe('getProfile', () => {
        it('should return user profile successfully', async () => {
            const req = {
                user: {
                    username: 'testuser'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ 
                        username: 'testuser',
                        full_name: 'John Doe',
                        address_1: '123 Main St',
                        address_2: 'Apt 101',
                        city: 'Anytown',
                        state: 'CA',
                        zipcode: '12345'
                    }]);
                }
            });
    
            await userController.getProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ 
                username: 'testuser',
                full_name: 'John Doe',
                address_1: '123 Main St',
                address_2: 'Apt 101',
                city: 'Anytown',
                state: 'CA',
                zipcode: '12345'
            });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if user profile not found', async () => {
            const req = {
                user: {
                    username: 'nonexistentuser'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, []);
                }
            });
    
            await userController.getProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User profile not found' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error retrieving user profile', async () => {
            const req = {
                user: {
                    username: 'testuser'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(new Error('DB error'));
                }
            });
    
            await userController.getProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });
    
    describe('updateProfile', () => {
        it('should update user profile successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    fullName: 'John Doe',
                    address1: '123 Main St',
                    address2: 'Apt 101',
                    city: 'Anytown',
                    state: 'CA',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('UPDATE')) {
                    callback(null, []);
                }
            });
    
            await userController.updateProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                username: 'testuser',
                fullName: 'John Doe',
                address1: '123 Main St',
                address2: 'Apt 101',
                city: 'Anytown',
                state: 'CA',
                zipcode: '12345'
            });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if required fields are missing', async () => {
            const req = {
                body: {
                    
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            await userController.updateProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
        });
    
        it('should return an error if there is an error updating user profile', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    fullName: 'John Doe',
                    address1: '123 Main St',
                    address2: 'Apt 101',
                    city: 'Anytown',
                    state: 'CA',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('UPDATE')) {
                    callback(new Error('DB error'));
                }
            });
    
            await userController.updateProfile(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });
    
    describe('createQuote', () => {
        it('should create a fuel quote successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    gallonsRequested: 100,
                    deliveryAddress: '123 Main St',
                    deliveryDate: '2024-04-10',
                    userState: 'TX', 
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockPricingInstance = new Pricing(req.body.userState, true, req.body.gallonsRequested);
    
            jest.mock('../controllers/pricing', () => {
                return jest.fn().mockImplementation(() => mockPricingInstance);
            });
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ userID: 1 }]);
                } else if (query.startsWith('INSERT')) {
                    callback(null, { insertId: 1 });
                }
            });
    
            await userController.createQuote(req, res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                quote_id: 1,
                userID: 1,
                gallonsRequested: 100,
                deliveryAddress: '123 Main St',
                deliveryDate: '2024-04-10',
                pricePerGallon: 1.71, 
                totalAmountDue: 171 
            });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error creating fuel quote', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    gallonsRequested: 100,
                    deliveryAddress: '123 Main St',
                    deliveryDate: '2024-04-10',
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                callback(new Error('DB error'));
            });
    
            await userController.createQuote(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });

    describe('getQuoteHistory', () => {
        it('should retrieve fuel quote history successfully', async () => {
            const loggedInUsername = 'testuser'; 
            const expectedResults = [{ quote_id: 1, gallons_requested: 100 }, { quote_id: 2, gallons_requested: 150 }]; 
    
            const req = {
                user: { username: loggedInUsername }
            };
    
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, expectedResults);
                }
            });
    
            await userController.getQuoteHistory(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResults);
    
            expect(mockQuery).toHaveBeenCalledWith(
                'SELECT * FROM fuel_quote WHERE userID = (SELECT userID FROM user_credentials WHERE username = ?) ORDER BY created_at DESC',
                [loggedInUsername],
                expect.any(Function)
            );
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error retrieving fuel quote history', async () => {
            const loggedInUsername = 'testuser'; 
    
            const req = {
                user: { username: loggedInUsername }
            };
    
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                callback(new Error('DB error'));
            });
    
            await userController.getQuoteHistory(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });

    describe('previewQuote', () => {
        it('should preview fuel quote successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    userState: 'TX',
                    gallonsRequested: 100,
                }
            };
    
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    callback(null, [{ quote_id: 1, gallons_requested: 100 }]);
                }
            });
    
            await userController.previewQuote(req, res);
    
            const pricing = new Pricing(req.body.userState, true, req.body.gallonsRequested);
            const expectedPricePerGallon = pricing.calculatePricePerGallon();
            const expectedTotalAmountDue = pricing.calculateTotalPrice();
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ pricePerGallon: expectedPricePerGallon, totalAmountDue: expectedTotalAmountDue });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error previewing fuel quote', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    userState: 'TX',
                    gallonsRequested: 100,
                }
            };
    
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                callback(new Error('DB error'));
            });
    
            await userController.previewQuote(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    
            mockQuery.mockRestore();
        });
    });
    
    describe('updatePassword', () => {
        it('should update password successfully', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    newPassword: 'newTestPassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    // Simulate user found in database
                    callback(null, [{ username: 'testuser' }]);
                } else if (query.startsWith('UPDATE')) {
                    // Simulate password update success
                    callback(null, []);
                }
            });
    
            await userController.updatePassword(req, res);
    
            expect(bcrypt.hash).toHaveBeenCalledWith('newTestPassword123@', 10, expect.any(Function));
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM user_credentials WHERE username = ?',
                ['testuser'],
                expect.any(Function)
            );
            expect(pool.query).toHaveBeenCalledWith(
                'UPDATE user_credentials SET password = ? WHERE username = ?',
                ['hashedPassword', 'testuser'],
                expect.any(Function)
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Password updated successfully' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if username is not found', async () => {
            const req = {
                body: {
                    username: 'nonexistentuser',
                    newPassword: 'newTestPassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    // Simulate user not found in database
                    callback(null, []);
                }
            });
    
            await userController.updatePassword(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Username not found' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error checking username', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    newPassword: 'newTestPassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    // Simulate database error
                    callback(new Error('DB error'));
                }
            });
    
            await userController.updatePassword(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error checking username' });
    
            mockQuery.mockRestore();
        });
    
        it('should return an error if there is an error updating password', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    newPassword: 'newTestPassword123@'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            const mockQuery = jest.spyOn(pool, 'query').mockImplementation((query, values, callback) => {
                if (query.startsWith('SELECT')) {
                    // Simulate user found in database
                    callback(null, [{ username: 'testuser' }]);
                } else if (query.startsWith('UPDATE')) {
                    // Simulate database error during password update
                    callback(new Error('DB error'));
                }
            });
    
            await userController.updatePassword(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error updating password' });
    
            mockQuery.mockRestore();
        });
    });
    
});
