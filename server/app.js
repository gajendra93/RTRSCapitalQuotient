const path = require('path');
// const logger = require('./../applogger');

const service = require('./service');
const restaurantRoutes = require('./restaurant');
const customerRoutes = require('./customer');

function setupWebAppRESTRoutes(app) {
  app.use('/restaurant', restaurantRoutes);
  // app.use('/customer', customerRoutes);
  return app;
}

function welcome() {
  process.stdout.write('\n=========== Restaurant Table Reservation System ===========\n');
}

// App Constructor function is exported
module.exports = function() {

  welcome();
  
  let app = service.createApp();
  
  // app = service.setupWebpack(app);
  
  app = service.setupStaticRoutes(app);
  
  app = service.setupMiddlewares(app);
  
  app = setupWebAppRESTRoutes(app);
  
  app = service.setupRestRoutes(app);

  service.setupMongooseConnections();
  
  return app;
}
