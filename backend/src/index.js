const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
const { registerModuleRoutes } = require('./modules');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const apiRouter = express.Router();
app.use('/api', routes);

// Register module routes
registerModuleRoutes(apiRouter);
app.use('/api', apiRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Sync database models
    await sequelize.sync();
    console.log('Database connected successfully');

    // Create admin user if not exists
    const { User } = require('./models');
    const adminExists = await User.findOne({
      where: { email: 'admin@example.com' }
    });

    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
        status: 'active'
      });
      console.log('Admin user created');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
