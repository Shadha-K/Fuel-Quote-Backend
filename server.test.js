const request = require('supertest');
const { app, server } = require('./server');
const pool = require('./models/db'); 

let userID; 

afterAll(async () => {
    await server.close();
});

describe('Test /api/auth routes', () => {
    /*
    it('POST /api/auth/register should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'newtestuser', password: 'testpassword123@' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
        expect(res.body).toHaveProperty('token');

        userID = res.body.userID; 
    });
    */
    it('POST /api/auth/login should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'newtestuser', password: 'testpassword123@' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    afterEach(async () => {
        if (userID) {
            await pool.query('DELETE FROM user_credentials WHERE id = ?', [userID]);
        }
    });
});
