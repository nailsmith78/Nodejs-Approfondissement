class NotFoundError extends Error {
  status = 404;
  constructor(message = "Not Found -- not-found.js") {
    super(message);
  }
}

module.exports = NotFoundError;
