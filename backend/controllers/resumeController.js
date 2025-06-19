const path = require('path');
const { extractTextFromImageOrPDF } = require('../utils/ocrParser');
const { runLlama } = require('../ollama/runner');

exports.uploadResumeImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const extractedText = await extractTextFromImageOrPDF(imagePath);

    req.session = req.session || {};
    req.session.resumeText = extractedText;

    res.json({
      success: true,
      message: 'Resume uploaded and processed. Choose: resume-based questions or DSA.',
      filename: req.file.filename // send back filename for future reference
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.generateQuestions = async (req, res) => {
  const { type, filename } = req.body;

  if (!type) {
    return res.status(400).json({ success: false, message: 'Missing type' });
  }

  try {
    let prompt = '';

    if (type === 'resume') {
      if (!filename) {
        return res.status(400).json({ success: false, message: 'Missing filename for resume' });
      }

      const filepath = path.join(__dirname, '..', 'uploads', filename);
      console.log('Attempting to extract text from:', filepath); // ✅ ADD THIS

      const text = await extractTextFromImageOrPDF(filepath);

      if (!text || text.trim().length < 30) {
        console.log('OCR output too short or empty');
        return res.status(400).json({ success: false, message: 'Resume OCR failed or file not found' });
      }

      prompt = `Based on this resume, ask interview questions:\n${text}`;
    } else if (type === 'dsa') {
      prompt = `Ask a medium-level DSA question suitable for coding interviews.`;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    console.log('Prompt sent to LLaMA:', prompt.slice(0, 200)); // ✅ Truncate for safety

    const question = await runLlama(prompt);
    res.json({ success: true, question });

  } catch (err) {
    console.error('[GenerateQuestions ERROR]', err); // ✅ Log the actual error
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
