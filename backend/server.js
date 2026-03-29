const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // WRD specific frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/v1/analyze', analyzeRoutes);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: "ok", service: "TruthLens AI", engine: "Gemini-1.5-Pro" });
});

// Final error handler (Ensure CORS headers for errors)
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack);
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.status(500).json({ 
    error: 'Internal Server Error',
    details: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`TruthLens AI Backend running on port ${PORT}`);
});
