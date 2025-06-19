// backend/MCP/contextManager.js
const memory = {};

exports.getContext = (userId) => memory[userId] || [];
exports.updateContext = (userId, interaction) => {
  if (!memory[userId]) memory[userId] = [];
  memory[userId].push(interaction);
};
// exports.clearContext = (userId) => {
//   if (memory[userId]) {
//     delete memory[userId];
//   }
// };