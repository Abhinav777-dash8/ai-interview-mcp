// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Middleware
app.use(express.json()); // Parse incoming JSON

// 3. API Routes
app.use('/api/interview', require('./routes/interviewRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/ats', require('./routes/atsRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // ✅ Add user auth routes

// 4. Root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the AI Interview Coach API 🔥');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
