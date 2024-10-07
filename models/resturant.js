// models/restaurant.js
const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    hours: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
