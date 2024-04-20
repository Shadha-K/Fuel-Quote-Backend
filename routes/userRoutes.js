const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

router.post('/login', userMiddleware.validateLogin, userController.login);
router.post('/register', userMiddleware.validateRegistration, userController.register);

router.get('/profile', userMiddleware.authenticate, userController.getProfile);
router.put('/profile', userMiddleware.authenticate, userMiddleware.validateProfileUpdate, userController.updateProfile);
router.post('/complete-profile', userMiddleware.validateCompleteProfile, userController.completeProfile);

router.post('/fuel-quote', userMiddleware.authenticate, userMiddleware.validateFuelQuote, userController.createQuote);
router.get('/fuel-quote/history', userMiddleware.authenticate, userController.getQuoteHistory);
router.post('/fuel-quote/preview', userMiddleware.authenticate, userMiddleware.validatePreviewQuote, userController.previewQuote);

module.exports = router;
