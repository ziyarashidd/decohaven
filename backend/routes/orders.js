const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create order
router.post('/', auth, async (req, res) => {
  const { items, totalAmount, shippingAddress, billingDetails, paymentMethod } = req.body;

  try {
    // Validate items have required fields
    const validatedItems = await Promise.all(items.map(async (item) => {
      const product = await require('../models/Product').findById(item.product);
      if (!product) throw new Error(`Product ${item.product} not found`);
      return {
        product: item.product,
        quantity: item.quantity,
        price: item.price || product.price,
      };
    }));

    const order = new Order({
      user: req.user,
      items: validatedItems,
      totalAmount,
      shippingAddress,
      billingDetails,
    });

    await order.save();
    await order.populate('items.product');

    // Clear user's cart after order
    await User.findByIdAndUpdate(req.user, { cart: [] });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user }).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order for admin (no user restriction)
router.get('/admin/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.user);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
