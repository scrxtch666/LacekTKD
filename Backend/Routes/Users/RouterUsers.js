const app = require("express");
const router = app.Router();
const db = require("../../Libs/db");

router.get("/", async (req, res) => {
  db.query(
    `SELECT 
        users.*,
        fighters.name     AS name,
        fighters.surname  AS surname,
        fighters.img_path AS img_path,
        role.role_name    AS role_name
     FROM users
     LEFT JOIN role     ON users.role_id  = role.id
     LEFT JOIN fighters ON fighters.id   = users.fighter_id`,
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání uživatelů" });
      res.json(results);
    },
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

router.get("/trainer", (req, res) => {
  db.query(
    `SELECT users.id, users.email, users.phone, fighters.name, fighters.surname, fighters.id, fighters.belts_id, fighters.img_path
     FROM users JOIN fighters ON fighters.id = users.fighter_id WHERE users.role_id LIKE "2";`,
    // SELECT users.id, users.email, users.phone, fighters.name, fighters.surname, fighters.id, fighters.belts_id, fighters.img_path
    // FROM users JOIN fighters ON fighters.id = users.fighter_id JOIN belts ON belts.belt_name = fighters.belts_id WHERE users.role_id LIKE "2";
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání trenérských údajů" });
      res.json(results);
    },
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Chyba při mazání z databáze" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Uživatel nenalezen" });

    res.json({ success: true, message: "Uživatel byl úspěšně smazán" });
  });
});

// POST - Přidání nového uživatele
router.post("/", (req, res) => {
  const { login, password, emial, phone, fighter_id, role_id } = req.body;

  // Validace povinných polí
  if (!login || !password || !role_id) {
    return res
      .status(400)
      .json({ error: "Chybí povinná pole (login, password, role_id)" });
  }

  db.query(
    `INSERT INTO users (login, password, emial, phone, fighter_id, role_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      login,
      password,
      emial || null,
      phone || null,
      fighter_id || null,
      role_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání uživatele:", err);
        return res
          .status(500)
          .json({ error: "Chyba při ukládání do databáze" });
      }

      res.status(201).json({
        success: true,
        message: "Uživatel byl úspěšně přidán",
        id: result.insertId,
      });
    },
  );
});
module.exports = router;
