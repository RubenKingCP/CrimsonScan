// Local development only: runs the Express app on a port (Vercel uses api/index.js instead).
require("./config/db")().then(() => {
  require("./app").listen(4000, () => console.log("API on http://localhost:4000"));
});
