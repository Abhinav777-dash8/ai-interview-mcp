const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../middleware/uploadMiddleware');

// 📄 Resume upload (with OCR)
router.post('/upload', upload.single('resume'), resumeController.uploadResumeImage);

// ❓ Question generation (resume or DSA)
router.post('/generate-questions', resumeController.generateQuestions);

module.exports = router;
