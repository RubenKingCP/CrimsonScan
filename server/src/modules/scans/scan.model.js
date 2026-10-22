// Scan: target, status, summary, and its findings embedded in the same document.
const { Schema, model, models } = require("mongoose");

const findingSchema = new Schema({
  owaspCategory: String, // e.g. "A03 Injection"
  severity: { type: String, enum: ["high", "medium", "low"] },
  source: { type: String, enum: ["zap", "semgrep", "quick"] },
  file: String,
  startLine: Number,
  endLine: Number,
  code: String,
  explanation: String,
  fix: String,
});

const scanSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    repo: String,
    url: String,
    status: { type: String, enum: ["queued", "running", "done", "failed"], default: "queued" },
    jobs: { zapId: String, semgrepId: String },
    summary: { high: Number, medium: Number, low: Number },
    findings: [findingSchema],
  },
  { timestamps: true }
);

module.exports = models.Scan || model("Scan", scanSchema);
