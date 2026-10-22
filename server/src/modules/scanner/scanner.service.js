// HTTP client for the droplet: ZAP REST API and semgrep-runner, always with the API key.
const headers = { "x-api-key": process.env.SCANNER_API_KEY };

exports.startZap = async (url) => {};
exports.zapStatus = async (id) => {};
exports.startSemgrep = async (archiveUrl) => {};
exports.semgrepStatus = async (id) => {};
