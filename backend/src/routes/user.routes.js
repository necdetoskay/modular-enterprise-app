const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get all users - admin and manager only
router.get('/', authorize(['admin', 'manager']), userController.getAllUsers);

// Get user by ID - admin, manager, or own profile
router.get('/:id', userController.getUserById);

// Create user - admin only
router.post('/', authorize(['admin']), userController.createUser);

// Update user - admin or own profile
router.put('/:id', userController.updateUser);

// Delete user - admin only
router.delete('/:id', authorize(['admin']), userController.deleteUser);

module.exports = router;
