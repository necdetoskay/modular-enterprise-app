/**
 * Module Registry
 * 
 * This file serves as a registry for all modules in the application.
 * When adding a new module, register it here to make it available to the application.
 */

// Import module routes
// Example: const vehicleRoutes = require('./vehicles/vehicle.routes');

// Module routes object
const moduleRoutes = {
  // Example: vehicles: vehicleRoutes
};

// Function to register all module routes with the Express app
const registerModuleRoutes = (router) => {
  // Register each module's routes
  // Example: router.use('/vehicles', moduleRoutes.vehicles);
  
  return router;
};

module.exports = {
  moduleRoutes,
  registerModuleRoutes
};
