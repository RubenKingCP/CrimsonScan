// Vercel entry point: connect to the DB, then hand the request to the Express app.
const app = require("../src/app");
const connectDB = require("../src/config/db");

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
