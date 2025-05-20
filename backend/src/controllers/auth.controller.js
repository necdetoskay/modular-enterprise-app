const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
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
      role: role || 'user'
    });
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isPasswordValid = await user.isValidPassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    if (user.status !== 'active') {
      return res.status(401).json({ message: 'User account is inactive' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    // User is attached to request by auth middleware
    const user = req.user;
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    res.status(200).json({
      user: userData
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
