const cache = require("../lib/cache");

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // e.g. /api/weather?city=Berlin
  const cachedData = cache.get(key);

  if (cachedData) {
    req.cacheStatus = "hit";      //  mark for logger
    return res.json(cachedData);  // return cached data immediately
  }

  req.cacheStatus = "miss";      // mark as miss and continue

  // Intercept res.json to store output into cache
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, body);
    return originalJson(body);
  };

  next();
  
}

module.exports = cacheMiddleware;