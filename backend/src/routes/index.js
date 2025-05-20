const express = require('express');
const router = express.Router();
const authRoutes = require('../core/auth/auth.routes');
const userRoutes = require('../core/users/user.routes');

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
