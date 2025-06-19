const express = require('express');
const router = express.Router();

// Import controller functions
const {
  signup,
  login,
  logout,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Import authentication middleware
const { protect } = require('../middleware/authMiddleware');

// ✅ Public Routes
router.post('/signup', signup);       // Create new user
router.post('/login', login);         // Authenticate user
router.post('/logout', logout);       // Optional: Logout (client discards token)

// ✅ Protected Routes (Require JWT)
router.put('/update', protect, updateUser);     // Update user profile
router.delete('/delete', protect, deleteUser);  // Delete user account

module.exports = router;
