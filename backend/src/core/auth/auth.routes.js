const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('./auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
