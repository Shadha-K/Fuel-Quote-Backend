import { validateLogin } from "./userMiddleware";
import { validateRegistration } from "./userMiddleware";
import { validateFuelQuote } from "./userMiddleware";
import { authenticate } from "./userMiddleware";
import { validateProfileUpdate } from "./userMiddleware";
import { validateCompleteProfile } from "./userMiddleware";
import { validatePreviewQuote } from "./userMiddleware";
import { validatePasswordChange } from "./userMiddleware";
const jwt = require('jsonwebtoken');

describe('validateLogin', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if username is missing', () => {
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
  });

  test('should return 400 with error message if password is missing', () => {
    req.body.username = 'testUser';
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
  });

  test('should return 400 with error message if username length is less than 4', () => {
    req.body.username = 'usr'; 
    req.body.password = 'testPassword';
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if username length is greater than 20', () => {
    req.body.username = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' 
    req.body.password = 'testPassword';
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if username contains invalid characters', () => {
    req.body.username = 'user@name'; 
    req.body.password = 'testPassword';
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid characters in username. Use only letters, numbers, dots, dashes, or underscores.' });
  });

  test('should return 400 with error message if password length is less than 4', () => {
    req.body.username = 'testUser';
    req.body.password = 'pwd'; 
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if password length is greater than 20', () => {
    req.body.username = 'testUser';
    req.body.password = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; 
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if password does not meet complexity requirements', () => {
    req.body.username = 'testUser';
    req.body.password = 'simplepassword'; 
    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must contain at least one letter, one number, and one special character' });
  });

  test('should call next() if username and password are valid', () => {
    req.body.username = 'validUsername';
    req.body.password = 'ValidPassword123!'; 
    validateLogin(req, res, next);
  
    expect(next).toHaveBeenCalled();
  });  

})

describe('validateRegistration', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if username is missing', () => {
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
  });

  test('should return 400 with error message if password is missing', () => {
    req.body.username = 'testUser';
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
  });

  test('should return 400 with error message if username length is invalid', () => {
    req.body.username = 'a'; 
    req.body.password = 'ValidPassword123!'; 
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if username contains invalid characters', () => {
    req.body.username = 'invalidUsername$'; 
    req.body.password = 'ValidPassword123!'; 
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid characters in username. Use only letters, numbers, dots, dashes, or underscores.' });
  });

  test('should return 400 with error message if password length is invalid', () => {
    req.body.username = 'validUsername';
    req.body.password = 'abc'; 
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if password complexity requirements are not met', () => {
    req.body.username = 'validUsername';
    req.body.password = 'password'; 
    validateRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must contain at least one letter, one number, and one special character' });
  });

  test('should call next() if username and password are valid', () => {
    req.body.username = 'validUsername';
    req.body.password = 'ValidPassword123!'; 
    validateRegistration(req, res, next);

    expect(next).toHaveBeenCalled();
  });
})

describe('validatePasswordChange', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if username is missing', () => {
    validatePasswordChange(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and new password are required' });
  });

  test('should return 400 with error message if new password is missing', () => {
    req.body.username = 'testUser';
    validatePasswordChange(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and new password are required' });
  });

  test('should return 400 with error message if new password length is less than 4', () => {
    req.body.username = 'testUser';
    req.body.newPassword = 'pwd';
    validatePasswordChange(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'New password must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if new password length is greater than 20', () => {
    req.body.username = 'testUser';
    req.body.newPassword = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    validatePasswordChange(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'New password must be between 4 and 20 characters' });
  });

  test('should return 400 with error message if new password does not meet complexity requirements', () => {
    req.body.username = 'testUser';
    req.body.newPassword = 'simplepassword';
    validatePasswordChange(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'New password must contain at least one letter, one number, and one special character' });
  });

  test('should call next() if username and new password are valid', () => {
    req.body.username = 'testUser';
    req.body.newPassword = 'ValidPassword123!';
    validatePasswordChange(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe('validateProfileUpdate', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if required fields are missing', () => {
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Full name, address, city, state, and zipcode are required' });
  });

  test('should return 400 with error message if full name length exceeds 50 characters', () => {
    req.body.fullName = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Full name must be 50 characters or less' });
  });

  test('should return 400 with error message if address 1 length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 1 must be 100 characters or less' });
  });

  test('should return 400 with error message if address 2 length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.address2 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 2 must be 100 characters or less' });
  });

  test('should return 400 with error message if city length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'City must be 100 characters or less' });
  });

  test('should return 400 with error message if zipcode length is under 5 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '123';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode length exceeds 9 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '0123456789';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode is not digits only', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12e456';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be digits only' });
  });

  test('should call next() if all fields are present and valid', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
  });
})

describe('validateProfileUpdate', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if required fields are missing', () => {
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Full name, address, city, state, and zipcode are required' });
  });

  test('should return 400 with error message if full name length exceeds 50 characters', () => {
    req.body.fullName = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Full name must be 50 characters or less' });
  });

  test('should return 400 with error message if address 1 length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 1 must be 100 characters or less' });
  });

  test('should return 400 with error message if address 2 length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.address2 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 2 must be 100 characters or less' });
  });

  test('should return 400 with error message if city length exceeds 100 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'City must be 100 characters or less' });
  });

  test('should return 400 with error message if zipcode length is under 5 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '123';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode length exceeds 9 characters', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '0123456789';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode is not digits only', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12e456';
    validateProfileUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be digits only' });
  });

  test('should call next() if all fields are present and valid', () => {
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateProfileUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
  });
})

describe('validateFuelQuote', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if gallons requested is missing', () => {
    req.body.deliveryDate = '2024-03-25';
    validateFuelQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gallons requested and delivery date are required' });
  });

  test('should return 400 with error message if delivery date is missing', () => {
    req.body.gallonsRequested = 100;
    validateFuelQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gallons requested and delivery date are required' });
  });

  test('should call next() if gallons requested and delivery date are present', () => {
    req.body.gallonsRequested = 100;
    req.body.deliveryDate = '2024-03-25';
    validateFuelQuote(req, res, next);

    expect(next).toHaveBeenCalled();
  });
})

describe('authenticate', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 401 with error message if authorization header is missing', () => {
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized - Missing authorization header' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 with error message if token is invalid', () => {
    req.headers.authorization = 'Bearer invalid_token';
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized - Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next() if token is valid', () => {
    const secretKey = 'your_secret_key';
    const token = jwt.sign({ username: 'test_user' }, secretKey);
    req.headers.authorization = `Bearer ${token}`;

    jwt.verify = jest.fn().mockImplementation((token, secretKey, callback) => {
      callback(null, { username: 'test_user' });
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ username: 'test_user' });
  });
})

describe('validateCompleteProfile', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if required fields are missing', () => {
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username, full name, address, city, state, and zipcode are required' });
  });

  test('should return 400 with error message if full name length exceeds 50 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Full name must be 50 characters or less' });
  });

  test('should return 400 with error message if address 1 length exceeds 100 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 1 must be 100 characters or less' });
  });

  test('should return 400 with error message if address 2 length exceeds 100 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.address2 = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Address 2 must be 100 characters or less' });
  });

  test('should return 400 with error message if city length exceeds 100 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'City must be 100 characters or less' });
  });

  test('should return 400 with error message if zipcode length is under 5 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '123';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode length exceeds 9 characters', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '0123456789';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be between 5 and 9 digits long' });
  });

  test('should return 400 with error message if zipcode is not digits only', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12e456';
    validateCompleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Zipcode must be digits only' });
  });

  test('should call next() if all fields are present and valid', () => {
    req.body.username = 'user_name123';
    req.body.fullName = 'John Doe';
    req.body.address1 = '123 Main St';
    req.body.city = 'City';
    req.body.state = 'ST';
    req.body.zipcode = '12345';
    validateCompleteProfile(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe('validatePreviewQuote', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('should return 400 with error message if username is missing', () => {
    req.body.userState = 'state';
    req.body.gallonsRequested = 100;
    validatePreviewQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username, userState, and gallonsRequested are required' });
  });

  test('should return 400 with error message if userState is missing', () => {
    req.body.username = 'username';
    req.body.gallonsRequested = 100;
    validatePreviewQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username, userState, and gallonsRequested are required' });
  });

  test('should return 400 with error message if gallonsRequested is missing', () => {
    req.body.username = 'username';
    req.body.userState = 'state';
    validatePreviewQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username, userState, and gallonsRequested are required' });
  });

  test('should return 400 with error message if gallonsRequested is not a number', () => {
    req.body.username = 'username';
    req.body.userState = 'state';
    req.body.gallonsRequested = 'not_a_number';
    validatePreviewQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gallons requested must be a positive number' });
  });

  test('should return 400 with error message if gallonsRequested is not a positive number', () => {
    req.body.username = 'username';
    req.body.userState = 'state';
    req.body.gallonsRequested = -10;
    validatePreviewQuote(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gallons requested must be a positive number' });
  });

  test('should call next() if username, userState, and gallonsRequested are valid', () => {
    req.body.username = 'username';
    req.body.userState = 'state';
    req.body.gallonsRequested = 100;
    validatePreviewQuote(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
