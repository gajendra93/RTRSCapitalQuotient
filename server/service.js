const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(path.resolve(__dirname, '../', 'client')));
  return app;
}

function setupRestRoutes(app) {
  //  MOUNT YOUR REST ROUTE HERE
  //  Eg: app.use('/resource', require(path.join(__dirname, './module')));

  app.use(function(req, res) {
    let err = new Error('Resource not found');
    err.status = 404;
    return res.status(err.status).json({
      error: err.message
    });
  });

  app.use(function(err, req, res) {
    console.error('Internal error in watch processor: ', err);
    return res.status(err.status || 500).json({
      error: err.message
    });
  });

  return app;
}

function setupMiddlewares(app) {
  //  For logging each requests
  app.use(morgan('dev'));
  const bodyParser = require('body-parser');
  const compression = require('compression');

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackCompiler = webpack(webpackConfig);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(compression());
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(webpackDevMiddleware(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
  }));

  return app;
}

function setupWebpack(app) {
  if (config.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('../webpack.config.js');
    const webpackCompiler = webpack(webpackConfig);

    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(webpackDevMiddleware(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
  }
  return app;
}

let setupMongooseConnections = function() {
  mongoose.Promise = require('bluebird');
  let mongoURL = 'mongodb://127.0.0.1:27017/rtrs';
  mongoose.connect(mongoURL, { useMongoClient: true });

  mongoose.connection.on('connected', function () {
    console.log('Mongoose is now connected to ', mongoURL);
  });

  mongoose.connection.on('error', function (err) {
    console.error('Error in Mongoose connection: ', err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose is now disconnected..!');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.info(
        'Mongoose disconnected on process termination'
        );
      process.exit(0);
    });
  });
}

// App Constructor function is exported
module.exports = {
  createApp: createApp,
  setupStaticRoutes: setupStaticRoutes,
  setupRestRoutes: setupRestRoutes,
  setupMiddlewares: setupMiddlewares,
  setupMongooseConnections: setupMongooseConnections,
  setupWebpack: setupWebpack
};
