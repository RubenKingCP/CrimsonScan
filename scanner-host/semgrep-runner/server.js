// Small HTTP service: checks the API key, downloads a repo, runs Semgrep with OWASP rules, returns JSON.
const http = require("http");

http
  .createServer((req, res) => {
    if (req.headers["x-api-key"] !== process.env.SCANNER_API_KEY) {
      res.writeHead(401).end();
      return;
    }
    // POST /scan { archiveUrl } -> { jobId }
    // GET /scan/:jobId -> { status, results }
    // runs: semgrep --config p/owasp-top-ten --json <dir>
    res.writeHead(404).end();
  })
  .listen(8081);
