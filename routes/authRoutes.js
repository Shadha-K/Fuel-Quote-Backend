const express = require('express');
const router = express.Router();

const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');

// POST /api/auth/login - Endpoint to authenticate a user
router.post('/login', validationMiddleware.validateLogin, authController.login);

// POST /api/auth/register - Endpoint to register a new user
router.post('/register', validationMiddleware.validateRegistration, authController.register);

module.exports = router;
