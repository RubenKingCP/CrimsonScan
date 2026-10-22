// /scans CRUD, all behind requireAuth.
const router = require("express").Router();
const requireAuth = require("../../middleware/requireAuth");
const c = require("./scan.controller");

router.use(requireAuth);
router.post("/", c.create);
router.get("/", c.list);
router.get("/:id", c.get);
router.delete("/:id", c.remove);

module.exports = router;
