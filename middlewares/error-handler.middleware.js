export const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    return res.status(400).json({message: err});
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({message: "Invalid Token"});
  }
  return res.status(500).json({message: err.message});
};

export const checkValidationError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
};
