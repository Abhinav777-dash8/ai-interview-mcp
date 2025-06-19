// models/ATSAnalysis.js
const mongoose = require('mongoose');

const atsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResumeUpload' },
  score: { type: Number, required: true },
  keywordMatches: [{ type: String }],
  missingKeywords: [{ type: String }],
  grammarIssues: [{ type: String }],
  feedbackSummary: { type: String },
  checkedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ATSAnalysis', atsSchema);
