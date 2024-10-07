const express = require('express');
const {
    getFoodItems,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem
} = require('../controllers/foodItemController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all food items from a restaurant
router.get('/restaurants/:restaurantId/food-items', getFoodItems);

// Add a new food item (only Admin or Restaurant owner)
router.post('/restaurants/:restaurantId/food-items', protect, addFoodItem);

// Update a food item (only Admin or Restaurant owner)
router.put('/food-items/:foodItemId', protect, updateFoodItem);

// Remove a food item (only Admin or Restaurant owner)
router.delete('/food-items/:foodItemId', protect, deleteFoodItem);

module.exports = router;
