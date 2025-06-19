const path = require('path');
const { extractTextFromImageOrPDF } = require('../utils/ocrParser');
const { scoreResume } = require('../utils/atsScorer');

const atsUploadHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const resumePath = path.resolve(req.file.path);
    console.log('[UPLOAD DEBUG] File info:', req.file);

    const extractedText = await extractTextFromImageOrPDF(resumePath);
    console.log('[OCR RESULT]', extractedText);

    const atsResult = await scoreResume(extractedText);
    res.status(200).json({ success: true, ...atsResult });
  } catch (err) {
    console.error('[ATS ERROR]', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { atsUploadHandler };
