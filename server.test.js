const request = require('supertest');
const { app, server } = require('./server');

afterAll(async () => {
  await server.close();
});

describe('POST /api/auth/register', () => {
  test('Register user with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpassword123@' });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('Register user with existing username', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpassword123@' });
    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe('Username already taken');
  });
});

describe('POST /api/auth/login', () => {
  test('Login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword123@' });
    expect(response.statusCode).toBe(200);
    expect(response.body.redirectTo).toBe('/registration');
    expect(response.body).toHaveProperty('token');
  });

  test('Login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'invalidpassword123@' });
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Invalid username or password');
  });
});
