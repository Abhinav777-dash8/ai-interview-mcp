const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name });
  res.json({ message: 'Signup successful', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};

exports.logout = async (req, res) => {
  // You can handle token blacklisting here if needed
  res.json({ message: 'Logout successful' });
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (password) update.password = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });
  res.json({ message: 'User updated', user });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'User deleted' });
};
