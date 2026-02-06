const app = require("express");
const router = app.Router();
const db = require("../../Libs/db"); // Teď už importuješ hotové spojení

router.get("/", async (req, res) => {
  // PŮVODNĚ: const client = db(); -> SMAZÁNO
  db.query(
    `SELECT * FROM event`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání turnajů a soustředění" });
      res.json(results);
    },
  );
});

router.get("/latest", (req, res) => {
  // PŮVODNĚ: const client = db(); -> SMAZÁNO
  db.query(
    `SELECT photo, title, DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start
     FROM event ORDER BY id DESC limit 3`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání turnajů a soustředění" });
      res.json(results);
    },
  );
});

module.exports = router;