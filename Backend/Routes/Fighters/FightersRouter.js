const app = require("express");
const router = app.Router();
const db = require("../../Libs/db")

router.get('/', async(req, res) => {
            const client = db();
            client.query(`SELECT fighters.img_path, fighters.name, fighters.surname, fighters.birth, TIMESTAMPDIFF(YEAR, fighters.birth, CURDATE()) AS age, fighters.best, fighters.legend, fighters.active, fighters.actual_weight_category, belts.cup, belts.img_path AS belt_path
   FROM fighters JOIN belts ON fighters.belts_id = belts.id;`, (err, results) => {
              if (err) return res.status(500).json({ error: 'Chyba při načítání závodníků' });
              res.json(results);
        })
});

/*
router.get('/', async(req, res) => {
            const client = db();
            client.query(`SELECT fighters.img_path, fighters.name, fighters.surname, belts.cup, belts.img_path AS belt_path
   FROM fighters JOIN belts ON fighters.belts_id = belts.id;`, (err, results) => {
              if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
              res.json(results);
        })
});
*/

router.get("/countAll", (req, res) => {
    const client = db();
    client.query("SELECT COUNT(ID) AS count FROM fighters;", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: result[0].count });
    });
});

module.exports = router;