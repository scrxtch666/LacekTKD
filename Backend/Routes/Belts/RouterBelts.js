const app = require("express");
const router = app.Router();
const db = require("../../Libs/db")

router.get('/', async(req, res) => {
            const client = db();
            client.query(`SELECT korean_name, cup, price, img_path
   FROM belt`, (err, results) => {
              if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
              res.json(results);
        })
});


module.exports = router;