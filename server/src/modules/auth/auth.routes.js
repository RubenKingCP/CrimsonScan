// /auth routes: GitHub redirect, callback, logout, current user.
const router = require("express").Router();
const c = require("./auth.controller");
const requireAuth = require("../../middleware/requireAuth");

router.get("/github", c.redirectToGitHub);
router.get("/github/callback", c.githubCallback);
router.post("/logout", c.logout);
router.get("/me", requireAuth, c.me);

module.exports = router;