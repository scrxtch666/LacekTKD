const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../auth/auth");
const db = require("../../Libs/db");

// GET /?tournamentId=5 – VEŘEJNÝ ENDPOINT (bez verifyToken)
router.get("/", (req, res) => {
  const { tournamentId } = req.query; 
  
  let sql = `
    SELECT tr.id, tr.tournament_id, tr.fighter_id, tr.place, tr.status,
           t.name AS tournament_name, t.location AS tournament_location,
           f.name AS fighter_name, f.surname AS fighter_surname,
           f.actual_weight_category AS fighter_weight
    FROM tournament_registration tr
    LEFT JOIN tournament t ON t.id = tr.tournament_id
    LEFT JOIN fighters f ON f.id = tr.fighter_id
  `;

  const params = [];
  if (tournamentId) {
    sql += " WHERE tr.tournament_id = ?";
    params.push(tournamentId);
  }

  sql += " ORDER BY f.surname ASC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při načítání startovní listiny" });
    res.json(results);
  });
});

router.get("/prihlaseny", verifyToken, (req, res) => {
  const userId = req.user.id;
  // Všimni si: JOINujeme tabulku users, abychom propojili přihlášeného uživatele s jeho fighterem
  const sql = `
    SELECT tr.*, t.name AS tournament_name, t.start_date
    FROM tournament_registration tr
    JOIN tournament t ON t.id = tr.tournament_id
    JOIN users u ON u.fighter_id = tr.fighter_id
    WHERE u.id = ?
    ORDER BY t.start_date DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při načítání tvých turnajů" });
    res.json(results);
  });
});

router.post("/:tournamentId/fighter/:fighterId", verifyToken, (req, res) => {
  db.query(
    "INSERT INTO tournament_registration (tournament_id, fighter_id) VALUES (?, ?)",
    [req.params.tournamentId, req.params.fighterId],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba při přihlašování" });
      res.json({ success: true });
    }
  );
});

router.delete("/:id", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM tournament_registration WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba při odhlašování" });
      res.json({ success: true });
    }
  );
});

module.exports = router;