/*
// profileRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const profileController = require('../controllers/profileController');

// GET /api/profile - Endpoint to retrieve the profile of the currently authenticated user
router.get('/', authMiddleware.authenticate, profileController.getProfile);

// PUT /api/profile - Endpoint to update the profile of the currently authenticated user
router.put('/', authMiddleware.authenticate, validationMiddleware.validateProfileUpdate, profileController.updateProfile);

module.exports = router;
*/