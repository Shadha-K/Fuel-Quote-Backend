const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

// Authentication
router.post('/login', userMiddleware.validateLogin, userController.login);
router.post('/register', userMiddleware.validateRegistration, userController.register);

// Profile Management
router.get('/profile', userMiddleware.authenticate, userController.getProfile);
router.put('/profile', userMiddleware.authenticate, userMiddleware.validateProfileUpdate, userController.updateProfile);
router.post('/complete-profile', userMiddleware.validateCompleteProfile, userController.completeProfile);

// Fuel Quote
router.post('/fuel-quote', userMiddleware.authenticate, userMiddleware.validateFuelQuote, userController.createQuote);
router.get('/fuel-quote/history', userMiddleware.authenticate, userController.getQuoteHistory);

module.exports = router;
