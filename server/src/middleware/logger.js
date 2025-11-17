function logger(req, res, next) {
  if (process.env.NODE_ENV === "test") {
    return next(); // disable logs in tests
  }

  const start = Date.now();

  // When the response is finished, log details
    res.on("finish", () => {     // this is an event listener
    const duration = Date.now() - start;

    const method = req.method;
    const path = req.originalUrl;
    const status = res.statusCode;

    const cacheInfo = req.cacheStatus ? ` cache:${req.cacheStatus}` : "";

    console.log(`${method} ${path} ${status} ${duration}ms${cacheInfo}`);
  });

  next();
}

module.exports = logger;
