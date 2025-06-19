// routes/interviewRoutes.js
const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

// 🎯 Interview Routes

// Start new interview session (Resume/DSA based)
router.post('/start-session', protect, interviewController.startSession);

// Get next interview question (user must be authenticated)
router.post('/get-question', protect, interviewController.getNextQuestion);

// Submit answer and get feedback
router.post('/submit-answer', protect, interviewController.submitAnswer);

// Get current user score
router.get('/get-score', protect, interviewController.getScore);

// [Optional] Start new session based on type (DSA/Resume)
router.post('/start-question', protect, interviewController.startQuestionBasedOnType);

module.exports = router;
