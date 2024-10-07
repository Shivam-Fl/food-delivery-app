// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");

// POST /orders: Create a new order (Customer)
router.post("/", orderController.createOrder);

// GET /orders/:id: Get order details by ID (Customer/Admin)
router.get("/:id", orderController.getOrderById);

// GET /users/:id/orders: Get user order history (Customer)
router.get("/users/:id/orders", orderController.getUserOrderHistory);

// PUT /orders/:id/status: Update order status (Admin)
router.put("/:id/status", orderController.updateOrderStatus);

// DELETE /orders/:id: Cancel an order (Customer/Admin)
router.delete("/:id", orderController.cancelOrder);

module.exports = router;
