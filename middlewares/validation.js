const { validationResult } = require("express-validator");

const validation = (schema) => {
  return (req, rea, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 400;
      error.errors = errors.array();
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
