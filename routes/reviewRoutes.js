const express = require('express');
const { leaveReview, getRestaurantReviews } = require('../controllers/reviewController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Leave a review for a restaurant
router.post('/reviews', leaveReview);

// Get all reviews for a specific restaurant
router.get('/restaurants/:restaurantId/reviews', getRestaurantReviews);

module.exports = router;
