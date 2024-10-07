// controllers/orderController.js
const Order = require("./../models/order");

// Create a new order (Customer)
exports.createOrder = async (req, res) => {
  try {
    const { restaurant, items, deliveryAddress } = req.body;
    const customer = req.body.customer; // Assuming req.user contains authenticated user details

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      customer,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant")
      .populate("customer");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user order history
exports.getUserOrderHistory = async (req, res) => {
  try {
    const customer = req.params.id; // Assuming req.user contains authenticated user details
    const orders = await Order.find({ customer })
      .sort({ createdAt: -1 })
      .populate("restaurant");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (e.g., "In-Progress", "Delivered")
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status; // Status should be passed in the body
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
