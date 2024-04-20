const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const path = require('path');

const app = express();

// app.use('/',express.static(path.join(__dirname, '..', '..', 'servey_frontend_user', 'dist', 'survey-user')));

// // Serve the static files for the admin frontend
// app.use('/admin', express.static(path.join(__dirname, '..', '..', 'admin_panel', 'dist', 'survey-admin')));


/* // Serve the Angular application
app.use(express.static(path.join(__dirname, '../client/dist/carbon-footprint-calculator')));

// Handle requests for Angular routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/carbon-footprint-calculator/index.html'));
}); */
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter);
}

// v1 api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
