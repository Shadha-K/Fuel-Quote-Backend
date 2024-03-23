const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

jest.mock('../middleware/userMiddleware');
jest.mock('../controllers/userController');

describe('Authentication Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', userRoutes); 
  });

  it('POST /api/auth/login should return 200 and a token on successful login', async () => {
    const userCredentials = { username: 'testuser', password: 'password' };
    const mockToken = 'mock-token';

    userMiddleware.validateLogin.mockImplementation((req, res, next) => {
      next();
    });

    userController.login.mockImplementation((req, res) => {
      res.status(200).json({ token: mockToken });
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: mockToken });
  });

  it('POST /api/auth/register should return 201 on successful registration', async () => {
    const newUser = { username: 'newuser', password: 'password' };

    userMiddleware.validateRegistration.mockImplementation((req, res, next) => {
      next();
    });

    userController.register.mockImplementation((req, res) => {
      res.status(201).json({ message: 'User registered successfully' });
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User registered successfully' });
  });
});
