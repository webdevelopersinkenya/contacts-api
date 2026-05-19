const errorHandler = (err, req, res, next) => {
  console.error(err); // helpful for debugging

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
      errors: err.errors
    });
  }

  // Duplicate key error (e.g. email unique)
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered"
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || "Server Error"
  });
};

module.exports = errorHandler;