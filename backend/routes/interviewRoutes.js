const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// 🎯 Interview routes
router.get('/start-session', interviewController.startSession);
router.post('/get-question', interviewController.getNextQuestion);          // Optionally pass userId in body
router.post('/get-question/:userId', interviewController.getNextQuestion);  // Or pass as param
router.post('/submit-answer', interviewController.submitAnswer);
router.get('/get-score/:userId', interviewController.getScore);
router.post('/start-question', interviewController.startQuestionBasedOnType);

module.exports = router;
