const express = require('express');
const jwt = require('jsonwebtoken');
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

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/', auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    const user = await User.findById(req.user);
    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart item
router.put('/:productId', auth, async (req, res) => {
  const { quantity } = req.body;

  try {
    const user = await User.findById(req.user);
    const item = user.cart.find(item => item.product.toString() === req.params.productId);

    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    await user.save();
    await user.populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
    await user.save();
    await user.populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.cart = [];
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
