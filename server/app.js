const path = require('path');
// const logger = require('./../applogger');

// var auth = require('./auth')();
const service = require('./service');

function setupWebAppRESTRoutes(app) {
  return app;
}

function welcome() {
  process.stdout.write('\n=========== React Boilerplate WWW ===========\n');
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
  
  return app;
}
