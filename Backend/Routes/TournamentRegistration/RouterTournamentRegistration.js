const app = require("express");
const router = app.Router();
const db = require("../../Libs/db");

router.get("/", async (req, res) => {
  db.query(
    `SELECT * FROM tournament_registration`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání turnajů" });
      res.json(results);
    },
  );
});

module.exports = router;
