const notFraund = (req, res) => res.status(404).json({ status: "failed", message: "Route does not exist" });

module.exports = notFraund;
