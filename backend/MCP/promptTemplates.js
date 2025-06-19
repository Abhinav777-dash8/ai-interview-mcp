// backend/MCP/promptTemplates.js
const { buildUserContextPrompt } = require('./memoryEngine');

exports.generatePrompt = (userId) => {
  const context = buildUserContextPrompt(userId);
  return `You are a job interviewer. Based on the following past answers, ask the next interview question:\n\n${context}\n\nNext question:`;
};
