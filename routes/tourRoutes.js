const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRoutes = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRoutes);
router
  .route('/alias-top-5')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.tourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router.route('/distances/:latlon/unit/:unit').get(tourController.getDistances);
router
  .route('/tours-within/:distance/center/:latlon/unit/:unit')
  .get(tourController.getToursWithin);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTours
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTours
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTours
  );

module.exports = router;
