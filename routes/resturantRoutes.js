// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("./../controllers/resturantController");
const { protect } = require("./../middlewares/authMiddleware");

// Middleware for admin authentication (pseudo-code)
const adminAuth = require("./../middlewares/authMiddleware");

// GET /restaurants: Get list of restaurants
router.get("/", restaurantController.getAllRestaurants);

// GET /restaurants/:id: Get restaurant details by ID
router.get("/:id", restaurantController.getRestaurantById);

// POST /restaurants: Add a new restaurant (Admin only)
router.post("/", restaurantController.addRestaurant);

// PUT /restaurants/:id: Update restaurant info (Admin only)
router.put("/:id", restaurantController.updateRestaurant);

// DELETE /restaurants/:id: Soft delete restaurant (Admin only)
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
