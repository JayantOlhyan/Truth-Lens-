const { redis } = require('../services/cacheService');

const rateLimiter = async (req, res, next) => {
  if (!redis || redis.status !== 'ready') return next();
  const ip = req.ip;
  const key = `rate-limit:${ip}`;
  const limit = 5; // 5 requests per minute
  const windowSeconds = 60;

  try {
    const currentCount = await redis.incr(key);
    if (currentCount === 1) {
      await redis.expire(key, windowSeconds);
    }
    if (currentCount > limit) {
      return res.status(429).json({ error: "Rate limit exceeded. Try again in 60 seconds." });
    }
    next();
  } catch (err) {
    console.error('Rate limiting error:', err);
    next(); // Continue on error
  }
};

module.exports = { rateLimiter };
