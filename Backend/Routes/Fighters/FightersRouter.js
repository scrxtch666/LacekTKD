const app = require("express");
const router = app.Router();
const db = require("../../Libs/db")

router.get('/', async(req, res) => {
            const client = db();
            client.query(`SELECT *
   FROM fighters`, (err, results) => {
              if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
              res.json(results);
        })
});

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