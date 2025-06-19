// backend/services/mcpService.js
const { getUser, createUser } = require('../models/userModel');
const { generatePrompt } = require('../MCP/promptTemplates');
const ollama = require('../utils/ollamaClient');

exports.startSession = async (userId) => {
  let user = getUser(userId);
  if (!user) user = createUser(userId);
  return { message: 'Session started', userId };
};

exports.getNextQuestion = async (userId) => {
  const prompt = generatePrompt(userId);
  const response = await ollama(prompt);
  return response;
};
