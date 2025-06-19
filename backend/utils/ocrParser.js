// backend/utils/ocrParser.js
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const extractTextFromImageOrPDF = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text.trim();
    } else {
      const { data: { text } } = await Tesseract.recognize(
        filePath,
        'eng',
        { logger: m => console.log(`[OCR] ${m.status}: ${Math.round(m.progress * 100)}%`) }
      );
      return text.trim();
    }
  } catch (err) {
    console.error('[OCR ERROR]', err);
    throw new Error('Failed to extract text from file');
  }
};

module.exports = { extractTextFromImageOrPDF };
