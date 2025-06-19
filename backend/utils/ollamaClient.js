// backend/utils/ollamaClient.js
const axios = require('axios');

module.exports = async function queryOllama(prompt) {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama3',
    prompt: prompt,
    stream: false
  });
  return response.data.response.trim();
};
