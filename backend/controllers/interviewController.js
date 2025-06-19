const InterviewSession = require('../models/InterviewSession');
const llamaService = require('../services/llamaService');

exports.startSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await InterviewSession.create({
      userId,
      userAnswers: [],
      feedback: [],
      score: 0,
    });

    console.log('✅ Session created:', session);

    res.status(201).json({
      message: 'Session started',
      sessionId: session.sessionId,
      userId: session.userId
    });
  } catch (err) {
    console.error('[START SESSION ERROR]', err);
    res.status(500).json({ error: 'Failed to start session' });
  }
};

exports.getNextQuestion = async (req, res) => {
  try {
    const userId = req.user.id;

    const prompt = `Pretend you are an interview coach. Ask the next technical interview question for a software developer.`;
    const question = await llamaService.askLlama(prompt);

    const session = await InterviewSession.findOne({ userId }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(404).json({ error: 'No active session found' });
    }

    session.questions.push(question);

    await session.save().then(saved => {
      console.log('✅ Question saved to session:', saved.sessionId);
    });

    res.json({ question });
  } catch (err) {
    console.error('[GET_QUESTION_ERROR]', err);
    res.status(500).json({ message: 'Error getting next question' });
  }
};

exports.submitAnswer = async (req, res) => {
  const { question, answer } = req.body;
  const userId = req.user.id;

  if (!question || !answer) {
    return res.status(400).json({ error: "Missing question or answer" });
  }

  try {
    const session = await InterviewSession.findOne({ userId }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const feedback = `Answer received for: "${question}"`;

    session.userAnswers.push({ question, answer });
    session.feedback.push({ question, feedback });
    session.score += 1;

    await session.save().then(saved => {
      console.log('✅ Answer submitted and session updated:', saved.sessionId);
    });

    res.json({ message: "Answer submitted", feedback, score: session.score });
  } catch (err) {
    console.error('[SUBMIT ANSWER ERROR]', err);
    res.status(500).json({ error: "Failed to submit answer" });
  }
};

exports.getScore = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await InterviewSession.findOne({ userId }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(404).json({ message: 'No session found for this user' });
    }

    res.json({ userId, score: session.score });
  } catch (err) {
    console.error('[GET SCORE ERROR]', err);
    res.status(500).json({ message: 'Failed to retrieve score' });
  }
};

exports.startQuestionBasedOnType = async (req, res) => {
  const { type } = req.body;

  if (!type) {
    return res.status(400).json({ success: false, message: 'Type is required (resume/dsa)' });
  }

  try {
    let prompt;

    if (type === 'resume') {
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
