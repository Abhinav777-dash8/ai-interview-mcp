const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.put('/user', authMiddleware, userController.updateUser);
router.delete('/user', authMiddleware, userController.deleteUser);

module.exports = router;
