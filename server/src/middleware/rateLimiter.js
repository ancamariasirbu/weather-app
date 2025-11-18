const rateLimit = require('express-rate-limit');
const config = require('../config');


const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,  // time window
  max: config.RATE_LIMIT_MAX_REQUESTS,    // limit per IP
  standardHeaders: true,                  // send rate limit info in headers
  legacyHeaders: false,                   // disable old X-RateLimit headers
handler: (req, res, next) => {
  res.status(429).json({
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests, please try again later"
    }
  });
}
});


module.exports = limiter;
