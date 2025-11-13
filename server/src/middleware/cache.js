const cache = require("../lib/cache");

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // e.g. /api/weather?city=Berlin
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log(`[CACHE HIT] ${key}`);
    return res.json(cachedData); // send cached response immediately
  }

  console.log(`[CACHE MISS] ${key}`);

  // Intercept res.json to store the response when route finishes
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, data);
      console.log(`[CACHE SET] ${key}`);
    }
    return originalJson(data);
  };

  next(); // continue to route handler
}

module.exports = cacheMiddleware;