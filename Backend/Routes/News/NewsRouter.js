const app = require("express");
const router = app.Router();
const db = require("../../Libs/db")

router.get('/', async(req, res) => {
            const client = db();
            client.query(`SELECT news_name,
        DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start, 
          DATE_FORMAT(date_end, '%d.%m.%Y') AS date_end, text,
          img_path
   FROM news`, (err, results) => {
              if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
              res.json(results);
        })
});

module.exports = router;