const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// ✅ Helper to sign a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    // Return token
    const token = generateToken(user._id);
    res.status(201).json({ message: 'Signup successful', user, token });

  } catch (err) {
    console.error('[SIGNUP ERROR]', err);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Logout (optional logic)
exports.logout = async (req, res) => {
  res.json({ message: 'Logout successful (client should discard token)' });
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const update = {};

    if (name) update.name = name;
    if (email) update.email = email;
    if (password) update.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });
    res.json({ message: 'User updated', user });

  } catch (err) {
    console.error('[UPDATE ERROR]', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User account deleted' });
  } catch (err) {
    console.error('[DELETE ERROR]', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
