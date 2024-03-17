// fuelQuoteRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');
const fuelQuoteController = require('../controllers/fuelQuoteController');
const profileController = require('../controllers/profileController');

// Authentication
router.post('/auth/login', validationMiddleware.validateLogin, authController.login);
router.post('/auth/register', validationMiddleware.validateRegistration, authController.register);

// Profile Management
router.get('/profile', authMiddleware.authenticate, profileController.getProfile);
router.put('/profile', authMiddleware.authenticate, validationMiddleware.validateProfileUpdate, profileController.updateProfile);

// Fuel Quote
router.post('/fuel-quote', authMiddleware.authenticate, validationMiddleware.validateFuelQuote, fuelQuoteController.createQuote);
router.get('/fuel-quote/history', authMiddleware.authenticate, fuelQuoteController.getQuoteHistory);

module.exports = router;
