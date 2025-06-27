const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', authController.isLoggedIn, viewsController.getAccount);

router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  authController.isLoggedIn,
  viewsController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.isLoggedIn,
  viewsController.updateUserData
);

module.exports = router;

// potential fix
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get(
//   '/my-tours',
//   bookingController.createBookingCheckout,
//   authController.protect,
//   viewsController.getMyTours
// );
