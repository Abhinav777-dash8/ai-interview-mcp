// ✅ backend/controllers/interviewController.js
const llamaService = require('../services/llamaService');

exports.startSession = (req, res) => {
  const userId = `user_${Math.floor(Math.random() * 10000)}`;
  res.json({ userId });
};

exports.getNextQuestion = async (req, res) => {
  try {
    const userId = req.params.userId || req.params.id;
    const prompt = `Pretend you are an interview coach. Ask the next technical interview question for a software developer.`;
    const question = await llamaService.askLlama(prompt);
    res.json({ question });
  } catch (err) {
    res.status(500).json({ message: 'Error getting next question' });
  }
};

exports.submitAnswer = async (req, res) => {
  const { userId, answer } = req.body;
  if (!userId || !answer) {
    return res.status(400).json({ message: 'Missing userId or answer' });
  }
  try {
    const prompt = `Here is the candidate's answer to a technical interview question:\n"${answer}"\nProvide constructive feedback and a score out of 10.`;
    const feedback = await llamaService.askLlama(prompt);
    res.json({ message: 'Answer evaluated', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating answer' });
  }
};

exports.getScore = (req, res) => {
  const { userId } = req.params;
  res.json({ userId, score: Math.floor(Math.random() * 10) + 1 }); // Dummy score
};

exports.startQuestionBasedOnType = async (req, res) => {
  const { userid, type } = req.body;

  if (!type) return res.status(400).json({ success: false, message: 'Type is required (resume/dsa)' });

  try {
    let prompt;

    if (type === 'resume') {
      // Ask behavioral questions, not parsed from resume
      prompt = `You're a behavioral interview coach. Ask 10 realistic behavioral questions in numbered format for a software developer candidate.`;
    } else if (type === 'dsa') {
      prompt = `Ask a technical interview question focused on Data Structures and Algorithms.`;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid type. Use "resume" or "dsa"' });
    }

    const question = await llamaService.askLlama(prompt);
    res.json({ success: true, question });
  } catch (err) {
    console.error('[QUESTION ERROR]', err);
    res.status(500).json({ success: false, message: 'Failed to generate question' });
  }
};
