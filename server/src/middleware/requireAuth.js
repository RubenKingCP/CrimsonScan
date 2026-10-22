// Verifies the JWT cookie and sets req.user, or answers 401.
const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not signed in" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }
  next();
};