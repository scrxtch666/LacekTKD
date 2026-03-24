const app = require("express");
const express = require("express"); // ← toto chybí
const router = express.Router();
const db = require("../../Libs/db");
const { verifyToken} = require("../../auth/auth");

router.get("/", async (req, res) => {
  db.query(
    `SELECT * FROM tournament_registration
    LEFT JOIN fighters ON tournament_registration.fighter_id = fighters.id`,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při načítání turnajů" });
      res.json(results);
    },
  );
});


// POST /:tournamentId/fighter/:fighterId – admin ruční přihlášení
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

// DELETE /:id – smazání konkrétní registrace podle jejího ID
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
