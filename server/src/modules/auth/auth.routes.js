// /auth routes: GitHub redirect, callback, logout, current user.
const router = require("express").Router();
const c = require("./auth.controller");

router.get("/github", c.redirectToGitHub);
router.get("/github/callback", c.githubCallback);
router.post("/logout", c.logout);
router.get("/me", c.me);

module.exports = router;
