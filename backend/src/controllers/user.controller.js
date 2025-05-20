const { User } = require('../models');

/**
 * Get all users
 * @route GET /api/users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

/**
 * Create a new user
 * @route POST /api/users
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      status: status || 'active'
    });
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    res.status(201).json({
      message: 'User created successfully',
      user: userData
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};

/**
 * Update user
 * @route PUT /api/users/:id
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email is being changed and already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    // Update user
    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
      status: status || user.status
    });
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    res.status(200).json({
      message: 'User updated successfully',
      user: userData
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.destroy();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
