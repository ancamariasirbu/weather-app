function createError(code, status, message) {
  const err = new Error(message);
  err.code = code;
  err.status = status;
  return err;
}

module.exports = createError;
