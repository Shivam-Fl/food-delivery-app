const FoodItem = require("../models/FoodItem");
const Restaurant = require("./../models/resturant");

// Get all food items from a specific restaurant
exports.getFoodItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodItems = await FoodItem.find({ restaurant: restaurantId });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new food item (Admin/Restaurant owner)
exports.addFoodItem = async (req, res) => {
  const { name, description, price, category, restaurantId } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const foodItem = await FoodItem.create({
      name,
      description,
      price,
      category,
      restaurant: restaurantId,
    });

    res.status(201).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update food item details
exports.updateFoodItem = async (req, res) => {
  const { foodItemId } = req.params;
  const { name, description, price, category, isAvailable } = req.body;

  try {
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    foodItem.name = name || foodItem.name;
    foodItem.description = description || foodItem.description;
    foodItem.price = price || foodItem.price;
    foodItem.category = category || foodItem.category;
    foodItem.isAvailable =
      isAvailable !== undefined ? isAvailable : foodItem.isAvailable;

    const updatedFoodItem = await foodItem.save();
    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a food item
exports.deleteFoodItem = async (req, res) => {
  const { foodItemId } = req.params;

  try {
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    await foodItem.remove();
    res.status(200).json({ message: "Food item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
