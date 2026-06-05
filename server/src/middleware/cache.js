const cache = require("../lib/cache");

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // e.g. /api/weather?city=Berlin
  const cachedData = cache.get(key);

  if (cachedData) {
    req.cacheStatus = "hit";      //  mark for logger
    return res.json(cachedData);  // return cached data immediately
  }

  req.cacheStatus = "miss";      // mark as miss and continue

  // Intercept res.json to store output into cache.
  // Only cache successful responses so transient errors aren't served for the
  // full TTL (and re-served with a 200 on the next cache hit).
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode < 400) {
      cache.set(key, body);
    }
    return originalJson(body);
  };

  next();
  
}

module.exports = cacheMiddleware;