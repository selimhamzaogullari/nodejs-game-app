const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.status(201).json({ status: "success", response: user });
}, true);

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return next(createCustomError('Invalid email or password'));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(createCustomError('Invalid email or password'));

  // The user is exist, username and password are correct
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ status: "success", response: token });
}, true);

module.exports = {register, login}