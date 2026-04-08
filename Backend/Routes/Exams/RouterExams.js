const express = require("express");
const router = express.Router();
const db = require("../../Libs/db");
const { verifyToken } = require("../../auth/auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";
const { parseDateSafe } = require("../../utils/date");

// --- POMOCNÉ FUNKCE ---

// Funkce pro získání isRegisteredSQL fragmentu
const getIsRegisteredSQL = (userId) => {
  return userId
    ? `(SELECT COUNT(*) FROM exam_registration er 
        WHERE er.exam_id = e.id 
        AND er.fighter_id = (SELECT fighter_id FROM users WHERE id = ${db.escape(userId)})
      ) AS is_registered`
    : `0 AS is_registered`;
};

// --- ROUTES ---

// GET / – veřejné zkoušky (pouze active)
router.get("/", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  let userId = null;
  if (token) {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      userId = payload.id;
    } catch (err) {
      console.log("Token error:", err.message);
    }
  }

  const isRegisteredSQL = getIsRegisteredSQL(userId);

  db.query(
    `SELECT e.*, u.login AS created_by_name, ${isRegisteredSQL}
     FROM exam e
     LEFT JOIN users u ON u.id = e.created_by
     WHERE e.status = 'active'
     ORDER BY e.date ASC`,
    (err, exams) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!exams.length) return res.json([]);

      db.query(
        `SELECT er.exam_id, er.id AS reg_id, f.id AS fighter_id,
                f.name AS fighter_name, f.surname AS fighter_surname,
                f.img_path AS fighter_pfp,
                f.actual_weight_category, b.cup
         FROM exam_registration er
         LEFT JOIN fighters f ON f.id = er.fighter_id
         LEFT JOIN belts b ON b.id = f.belts_id
         ORDER BY f.surname ASC`,
        (err2, regs) => {
          if (err2) return res.status(500).json({ error: "Chyba serveru" });

          const result = exams.map((exam) => ({
            ...exam,
            is_registered: !!exam.is_registered,
            registrations: regs.filter((r) => r.exam_id === exam.id),
          }));
          res.json(result);
        },
      );
    },
  );
});

// GET /admin – všechny zkoušky pro admina (včetně hidden)
router.get("/admin", verifyToken, (req, res) => {
  const userId = req.user.id;
  const isRegisteredSQL = getIsRegisteredSQL(userId);

  db.query(
    `SELECT 
    e.id, e.title, e.description, e.location, e.price, e.status, e.created_by,
    DATE_FORMAT(e.date, '%Y-%m-%d') AS date, 
    DATE_FORMAT(e.registrable_date, '%Y-%m-%d') AS registrable_date,
    u.login AS created_by_name, ${isRegisteredSQL}
     FROM exam e
     LEFT JOIN users u ON u.id = e.created_by
     ORDER BY e.date DESC`,
    (err, exams) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!exams.length) return res.json([]);

      db.query(
        `SELECT er.exam_id, er.id AS reg_id, f.id AS fighter_id,
                f.name AS fighter_name, f.surname AS fighter_surname,
                f.img_path AS fighter_pfp,
                f.actual_weight_category, b.cup
         FROM exam_registration er
         LEFT JOIN fighters f ON f.id = er.fighter_id
         LEFT JOIN belts b ON b.id = f.belts_id
         ORDER BY f.surname ASC`,
        (err2, regs) => {
          if (err2) return res.status(500).json({ error: "Chyba serveru" });

          const result = exams.map((exam) => ({
            ...exam,
            is_registered: !!exam.is_registered,
            registrations: regs.filter((r) => r.exam_id === exam.id),
          }));
          res.json(result);
        },
      );
    },
  );
});

// POST / – přidání zkoušky
router.post("/", verifyToken, (req, res) => {
  const {
    title,
    description,
    date,
    location,
    registrable_date,
    price,
    status,
  } = req.body;
  if (!title || !date)
    return res.status(400).json({ error: "Chybí název nebo datum" });

  db.query(
    `INSERT INTO exam (title, description, date, location, registrable_date, price, status, created_by)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description || null,
      parseDateSafe(date),
      location || null,
      parseDateSafe(registrable_date),
      price || null,
      status || "hidden",
      req.user.id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Chyba při ukládání" });
      res.status(201).json({ success: true, id: result.insertId });
    },
  );
});

// PUT /:id – editace
router.put("/:id", verifyToken, (req, res) => {
  const {
    title,
    description,
    date,
    location,
    registrable_date,
    price,
    status,
  } = req.body;
  if (!title || !date)
    return res.status(400).json({ error: "Chybí název nebo datum" });

  db.query(
    `UPDATE exam SET title=?, description=?, date=?, location=?, registrable_date=?, price=?, status=?
   WHERE id=?`,
    [
      title,
      description || null,
      parseDateSafe(date),
      location || null,
      parseDateSafe(registrable_date),
      price || null,
      status || "hidden",
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba při ukládání" });
      res.json({ success: true });
    },
  );
});

// DELETE /:id – smazání zkoušky
router.delete("/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM exam WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Chyba při mazání" });
    res.json({ success: true });
  });
});

// POST /:id/register – přihlášení uživatele na zkoušku
router.post("/:id/register", verifyToken, (req, res) => {
  db.query(
    `SELECT u.fighter_id, f.name, f.surname, f.birth, f.actual_weight_category
     FROM users u
     LEFT JOIN fighters f ON f.id = u.fighter_id
     WHERE u.id = ?`,
    [req.user.id],
    (err, results) => {
      if (err || !results.length)
        return res.status(400).json({ error: "Uživatel nenalezen" });

      const { fighter_id, name, surname, birth, actual_weight_category } =
        results[0];

      if (!fighter_id)
        return res
          .status(400)
          .json({ error: "Nemáš přiřazeného závodníka. Kontaktuj trenéra." });
      if (!name || !surname)
        return res
          .status(400)
          .json({
            error:
              "Závodník nemá vyplněné jméno a příjmení. Kontaktuj trenéra.",
          });
      if (!birth || birth.toString().startsWith("0000"))
        return res
          .status(400)
          .json({
            error: "Závodník nemá vyplněné datum narození. Kontaktuj trenéra.",
          });
      if (!actual_weight_category)
        return res
          .status(400)
          .json({
            error:
              "Závodník nemá vyplněnou váhovou kategorii. Kontaktuj trenéra nebo ji doplň v profilu.",
          });

      db.query(
        "INSERT INTO exam_registration (exam_id, fighter_id) VALUES (?, ?)",
        [req.params.id, fighter_id],
        (err2) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při přihlašování" });
          res.json({ success: true });
        },
      );
    },
  );
});

// DELETE /:id/register – odhlášení uživatele (s kontrolou uzávěrky)
router.delete("/:id/register", verifyToken, (req, res) => {
  const examId = req.params.id;

  db.query(
    "SELECT registrable_date FROM exam WHERE id = ?",
    [examId],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(500).json({ error: "Chyba serveru" });

      if (results[0].registrable_date) {
        const deadline = new Date(results[0].registrable_date);
        deadline.setHours(23, 59, 59, 999);
        if (new Date() > deadline) {
          return res
            .status(403)
            .json({ error: "Po uzávěrce se již nelze odhlásit!" });
        }
      }

      db.query(
        `DELETE er FROM exam_registration er
       JOIN users u ON u.fighter_id = er.fighter_id
       WHERE er.exam_id = ? AND u.id = ?`,
        [examId, req.user.id],
        (err2) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při odhlašování" });
          res.json({ success: true });
        },
      );
    },
  );
});

// DELETE /registration/:id – admin smazání konkrétní registrace
router.delete("/registration/:id", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM exam_registration WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba při mazání" });
      res.json({ success: true });
    },
  );
});

// PUT /:id/status – toggle status
router.put("/:id/status", verifyToken, (req, res) => {
  const { status } = req.body;
  if (!["active", "hidden"].includes(status))
    return res.status(400).json({ error: "Neplatný status" });

  db.query(
    "UPDATE exam SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      res.json({ success: true });
    },
  );
});

module.exports = router;
