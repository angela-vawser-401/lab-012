const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(checkConnection);
app.use(express.json());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
app.use('/api/tours', require('../routes/tours'));
app.use('/api/stops', require('../routes/stops'));

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;