// /sites routes, all behind requireAuth: list, add, get one, verify ownership, delete.
const router = require("express").Router();
const requireAuth = require("../../middleware/requireAuth");
const c = require("./site.controller");

router.use(requireAuth);              // every route below needs a signed-in user
router.get("/", c.list);              // GET    /sites
router.post("/", c.create);           // POST   /sites            { name, domain }
router.get("/:id", c.get);            // GET    /sites/:id
router.post("/:id/verify", c.verify); // POST   /sites/:id/verify  checks the DNS record
router.delete("/:id", c.remove);      // DELETE /sites/:id

module.exports = router;