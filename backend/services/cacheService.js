const Redis = require('ioredis');
const crypto = require('crypto');

// Initialize Redis client
let redis;
try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null // Don't retry indefinitely if down
  });
  
  redis.on('error', (err) => {
    console.warn('Redis not available, caching disabled:', err.message);
  });
} catch (e) {
  console.warn('Could not initialize Redis:', e.message);
}

async function getCachedResult(content) {
  if (!redis || redis.status !== 'ready') return null;
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  const cached = await redis.get(`truthlens:${hash}`);
  return cached ? JSON.parse(cached) : null;
}

async function setCachedResult(content, result) {
  if (!redis || redis.status !== 'ready') return;
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  // Cache for 24 hours (86400 seconds) as per WRD
  await redis.set(`truthlens:${hash}`, JSON.stringify(result), 'EX', 86400);
}

module.exports = {
  getCachedResult,
  setCachedResult,
  redis
};
