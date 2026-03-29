const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeText, analyzeImage } = require('../services/geminiService');
const { getCachedResult, setCachedResult } = require('../services/cacheService');
const { rateLimiter } = require('../middleware/rateLimiter');

// In-memory or disk storage for temporary image processing
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/text', rateLimiter, async (req, res) => {
  const { content } = req.body;
  if (!content || content.length < 20) {
    return res.status(400).json({ error: "Content too short. Min 20 characters required." });
  }

  try {
    const cached = await getCachedResult(content);
    if (cached) return res.json(cached);

    const result = await analyzeText(content);
    await setCachedResult(content, result);
    res.json(result);
  } catch (err) {
    console.error('SERVER ERROR (TEXT ANALYSIS):', err);
    res.status(500).json({ 
      error: "Failed to analyze content.", 
      details: err.message 
    });
  }
});

router.post('/image', upload.single('image'), rateLimiter, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const cached = await getCachedResult(req.file.buffer.toString('base64'));
    if (cached) return res.json(cached);

    const result = await analyzeImage(req.file.buffer, req.file.mimetype);
    await setCachedResult(req.file.buffer.toString('base64'), result);
    res.json(result);
  } catch (err) {
    console.error('Image analysis error:', err);
    res.status(500).json({ error: "Failed to analyze image." });
  }
});

module.exports = router;
