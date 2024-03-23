const { getProfile, createQuote, fuelQuoteData } = require('./userController');
const { getQuoteHistory } = require('./userController');

describe('getProfile function', () => {
    let req, res, userProfiles;

    beforeEach(() => {
        req = {
            user: { username: 'user_name123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        userProfiles = {
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

        jest.clearAllMocks(); 
    });

    test('should return user profile if found', async () => {
        await getProfile(req, res, userProfiles);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: 'user_name123',
            fullName: 'John Doe',
            address1: '123 Main St',
            address2: '',
            city: 'City',
            state: 'ST',
            zipcode: '12345'
        });
    });

    test('should return 404 if user profile not found', async () => {
        req.user.username = 'unknown_user';

        await getProfile(req, res, userProfiles);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User profile not found' });
    });

    describe('createQuote function', () => {
        let req, res;
    
        beforeEach(() => {
            req = {
                body: {
                    username: 'user_name123',
                    gallonsRequested: 50,
                    deliveryAddress: '123 Main St City, ST 12345',
                    deliveryDate: '3/18/2034',
                    pricePerGallon: 2.13,
                    totalAmountDue: 106.5
                }
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.clearAllMocks(); 
        });
    
       
        const originalFuelQuoteData = [...fuelQuoteData]; 
        beforeAll(() => {
            fuelQuoteData.length = 0; 
        });
    
        afterAll(() => {
            fuelQuoteData.push(...originalFuelQuoteData); 
        });
    
        test('should create a new fuel quote', async () => {
            await createQuote(req, res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                username: 'user_name123',
                gallonsRequested: 50,
                deliveryAddress: '123 Main St City, ST 12345',
                deliveryDate: '3/18/2034',
                pricePerGallon: 2.13,
                totalAmountDue: 106.5
            });
            expect(fuelQuoteData).toHaveLength(1);
        });
    });  
    
    

});

