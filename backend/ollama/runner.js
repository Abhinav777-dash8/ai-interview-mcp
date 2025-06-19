const axios = require('axios');

exports.runLlama = async (prompt) => {
  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'llama3',
        prompt,
        stream: false
      },
      {
        timeout: 1000000
      }
    );

    return response.data.response || 'No response from model.';
  } catch (err) {
    console.error('[LLaMA ERROR]', err.message || err);
    throw new Error('LLaMA failed or timed out');
  }
};
