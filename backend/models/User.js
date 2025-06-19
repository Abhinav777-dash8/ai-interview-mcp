// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewSession'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
