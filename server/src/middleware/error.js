function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";

  // never expose stack traces to the client
  const message =
    status === 500
      ? "An internal error occurred. Please try again later."
      : err.message;

  res.status(status).json({
    error: { code, message, status }
  });
}

module.exports = errorHandler;
