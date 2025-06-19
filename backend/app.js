// backend/app.js
const express = require('express');
const app = express();
const interviewRoutes = require('./routes/interviewRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use('/api/interview', interviewRoutes);
app.use('/api/user', userRoutes);

// 👇 Add this catch-all route for root "/"
app.get('/', (req, res) => {
  res.send('✅ AI Job Coach Backend is live!');
});

module.exports = app;
