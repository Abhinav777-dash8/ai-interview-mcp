// models/ResumeUpload.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'image'], required: true },
  uploadedAt: { type: Date, default: Date.now },
  extractedText: { type: String },
  extractedSkills: [{ type: String }],
  extractedExperience: { type: String }
});

module.exports = mongoose.model('ResumeUpload', resumeSchema);
