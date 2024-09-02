const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode || 400).json({ status: "failed", statusCode: err.statusCode || 400, message: err.message });
  }
  return res.status(500).json({ status: "failed", statusCode: 500, message: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
