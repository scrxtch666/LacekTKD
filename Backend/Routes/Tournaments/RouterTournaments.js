const app = require("express");
const router = app.Router();
const db = require("../../Libs/db");

router.get("/", async (req, res) => {
  db.query(
    `SELECT 
            tournament.name AS tournament_name,
            tournament.location,
            tournament.price,
            type.name AS type_name,
            tournament.info,
            tournament.img_path,
            DATE_FORMAT(start_date, '%d.%m.') AS start_date,
            DATE_FORMAT(end_date, '%d.%m.%Y') AS end_date
        FROM tournament
        INNER JOIN type ON tournament.type_id = type.id
        ORDER BY tournament.id DESC`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání turnajů a soustředění" });
      res.json(results);
    }
  );
});
/*
router.get('/:eventId', async(req, res) => {
    if(typeof req.params.eventId == "undefined") {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            date: Date.now(),
            message: "Neplatné ID akce."
        });
    }
    const id = req.params.eventId;
    const client = db();
    client.query(`SELECT name, location, price, type, 
        DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start, 
        DATE_FORMAT(date_end, '%d.%m.%Y') AS date_end, 
        info 
 FROM tournaments WHERE id = ? LEFT JOIN tournament_registration ON fighters.`, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
      res.json(results);
})
});  */

router.get("/latest", (req, res) => {
  db.query(
    `SELECT 
            tournament.name AS tournament_name,
            tournament.location,
            tournament.price,
            type.name AS type_name,
            tournament.info,
            tournament.img_path,
            DATE_FORMAT(start_date, '%d.%m.') AS start_date,
            DATE_FORMAT(end_date, '%d.%m.%Y') AS end_date
        FROM tournament
        INNER JOIN type ON tournament.type_id = type.id
        ORDER BY tournament.id DESC
        LIMIT 1`,
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání dat!" });
      res.json(results);
    }
  );
});

module.exports = router;
