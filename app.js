const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const tourRouter = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const viewRoutes = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// MIDDLEWARES

// query parsing middleware
app.set('query parser', 'extended');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(compression());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRoutes);

// ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.all('/{*any}', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} from our server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
