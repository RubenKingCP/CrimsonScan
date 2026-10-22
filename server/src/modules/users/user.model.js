// User: GitHub identity, encrypted GitHub token, references to scans.
const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: String,
    avatarUrl: String,
    githubToken: String, // store encrypted
    scans: [{ type: Schema.Types.ObjectId, ref: "Scan" }],
  },
  { timestamps: true }
);

module.exports = models.User || model("User", userSchema);
