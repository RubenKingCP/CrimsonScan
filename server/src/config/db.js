// Connects Mongoose to MongoDB Atlas, cached so serverless requests reuse one connection.
const mongoose = require("mongoose");

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

module.exports = async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(process.env.MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
};
