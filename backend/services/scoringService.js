// backend/services/scoringService.js
const { getUser, updateUser } = require('../models/userModel');
const ollama = require('../utils/ollamaClient');

exports.evaluateAnswer = async (userId, answer) => {
  const feedbackPrompt = `Evaluate the following interview answer and give constructive feedback:\n\n"${answer}"`;
  const feedback = await ollama(feedbackPrompt);
  const user = getUser(userId);
  user.score += 1; // Placeholder scoring logic
  updateUser(userId, user);
  return feedback;
};

exports.getScore = async (userId) => {
  const user = getUser(userId);
  return user?.score || 0;
};
// exports.resetScore = async (userId) => {
//   const user = getUser(userId);
//   user.score = 0;
//   updateUser(userId, user);
//   return user.score;
// };