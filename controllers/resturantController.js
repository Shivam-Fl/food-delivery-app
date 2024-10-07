// controllers/restaurantController.js
const Restaurant = require("./../models/resturant.js");

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new restaurant (Admin only)
exports.addRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine, phone, hours } = req.body;
    const newRestaurant = new Restaurant({
      name,
      address,
      cuisine,
      phone,
      hours,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update restaurant info (Admin only)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete restaurant (Admin only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.isActive = false;
    await restaurant.save();
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
