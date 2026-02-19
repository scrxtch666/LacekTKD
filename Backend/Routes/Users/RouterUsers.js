const app = require("express");
const router = app.Router();
const db = require("../../Libs/db");
const bcrypt = require("bcryptjs");

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
    `SELECT users.id, users.email, users.phone, fighters.name, fighters.surname, fighters.id, belts.cup, role.role_name, fighters.img_path FROM users JOIN fighters ON fighters.id = users.fighter_id JOIN role ON role.id = users.role_id JOIN belts ON belts.id = fighters.belts_id WHERE role.role_name LIKE '%tr%'`,
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
router.post("/", async (req, res) => {
  const { login, password, email, role_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Validace povinných polí
  if (!login || !password || !role_id) {
    return res
      .status(400)
      .json({ error: "Chybí povinná pole (login, password, role_id)" });
  }

  db.query(
    `INSERT INTO users (login, password, email, role_id) 
     VALUES (?, ?, ?, ?)`,
    [login, hashedPassword, email, role_id],
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

// PUT - Editace uživatele
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { login, password, email, role_id } = req.body;

  // Validace povinných polí
  if (!login || !role_id) {
    return res
      .status(400)
      .json({ error: "Chybí povinná pole (login, role_id)" });
  }

  try {
    // Pokud bylo zadáno nové heslo, zahashujeme ho
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `UPDATE users SET login = ?, password = ?, email = ?, role_id = ? WHERE id = ?`,
        [login, hashedPassword, email || null, role_id, id],
        (err, result) => {
          if (err) {
            console.error("Chyba při editaci uživatele:", err);
            return res
              .status(500)
              .json({ error: "Chyba při ukládání do databáze" });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Uživatel nenalezen" });
          }
          res.json({ success: true, message: "Uživatel byl úspěšně upraven" });
        },
      );
    } else {
      // Bez změny hesla
      db.query(
        `UPDATE users SET login = ?, email = ?, role_id = ? WHERE id = ?`,
        [login, email || null, role_id, id],
        (err, result) => {
          if (err) {
            console.error("Chyba při editaci uživatele:", err);
            return res
              .status(500)
              .json({ error: "Chyba při ukládání do databáze" });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Uživatel nenalezen" });
          }
          res.json({ success: true, message: "Uživatel byl úspěšně upraven" });
        },
      );
    }
  } catch (error) {
    console.error("Chyba:", error);
    res.status(500).json({ error: "Interní chyba serveru" });
  }
});
module.exports = router;
