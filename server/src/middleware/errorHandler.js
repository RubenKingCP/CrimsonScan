// Turns thrown errors into clean JSON, without leaking stack traces.
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ error: err.expose ? err.message : "Something went wrong" });
};
