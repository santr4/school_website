const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ LOGIN (Plain Text)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Match both username and plain password
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      role: user.role,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ SIGNUP (Plain Text)
router.post('/signup', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // No hashing — password stored as-is
    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

module.exports = router;
