// backend/services/llamaService.js
const axios = require('axios');

exports.askLlama = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3', // Make sure you used this name with `ollama run llama3`
      prompt: prompt,
      stream: false
    });

    return response.data.response.trim();
  } catch (err) {
    console.error('Error calling LLaMA 3 via Ollama:', err.message);
    throw err;
  }
};
