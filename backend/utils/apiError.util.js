class apiError extends Error {
  constructor(status, message, errors = [], stack = "") {
    super(message);
    this.status = status;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
