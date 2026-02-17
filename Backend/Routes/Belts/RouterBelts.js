const app = require("express");
const router = app.Router();
const db = require("../../Libs/db");

router.get("/", async (req, res) => {
  db.query(
    `SELECT belt_name, cup, price, img_path
   FROM belts`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání pásků" });
      res.json(results);
    },
  );
});

module.exports = router;
