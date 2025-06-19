// backend/MCP/memoryEngine.js
const { getContext } = require('./contextManager');

exports.buildUserContextPrompt = (userId) => {
  const history = getContext(userId);
  return history.map((h, i) => `Q${i+1}: ${h.q}\nA${i+1}: ${h.a}`).join('\n');
};
