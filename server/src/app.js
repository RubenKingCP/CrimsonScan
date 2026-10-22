// Express setup: JSON, cookies, CORS for the client only, security headers, module routes, errors.
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/auth", require("./modules/auth/auth.routes"));
app.use("/scans", require("./modules/scans/scan.routes"));

app.use("/sites", require("./modules/sites/site.routes"));


app.use(errorHandler);
module.exports = app;
