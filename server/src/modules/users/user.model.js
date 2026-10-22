// User: GitHub identity and GitHub token. Created or updated on every sign-in.
const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: String,
    githubToken: { type: String, select: false }, // hidden unless asked for with .select("+githubToken")
    lastLoginAt: Date,
  },
  { timestamps: true }
);

module.exports = models.User || model("User", userSchema);