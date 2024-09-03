const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createCustomError } = require("../errors/custom-error");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    return next(createCustomError(`Please login`, 401));
  }
};

module.exports = authMiddleware;
