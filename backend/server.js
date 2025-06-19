const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const interviewRoutes = require('./routes/interviewRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const atsRoutes = require('./routes/atsRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 Register routes
app.use('/api/interview', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes); // ✅ Correct position

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});