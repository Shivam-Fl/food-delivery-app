const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const foodItemRoutes = require("./routes/foodItemRoutes");
const resturantRoutes = require("./routes/resturantRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(express.json()); // Body parser

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", foodItemRoutes);
app.use("/api/resturant", resturantRoutes);
app.use("/api/order", orderRoutes);

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
