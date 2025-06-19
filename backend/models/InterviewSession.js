const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, default: uuidv4, unique: true },
  createdAt: { type: Date, default: Date.now },
  resumeBased: { type: Boolean, default: false },
  questions: [{ type: String }],
  userAnswers: [{ question: String, answer: String }],
  feedback: [{ question: String, feedback: String }],
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
