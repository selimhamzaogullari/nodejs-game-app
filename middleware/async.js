const { createCustomError } = require("../errors/custom-error");

const asyncWrapper = (fn, customErrorMessage = false) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next((!customErrorMessage || !e.hasOwnProperty('errors')) ? e : createCustomError(e?.errors[0]?.message));
    }
  };
};

module.exports = asyncWrapper;
