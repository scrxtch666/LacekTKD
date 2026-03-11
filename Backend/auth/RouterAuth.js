const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Libs/db");
const { verifyToken } = require("./auth");

// Tajný klíč z .env
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";
// Registrace
router.post("/register", async (req, res) => {
  const { login, password, email } = req.body;

  try {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Chyba serveru při kontrole e-mailu" });

        if (results.length > 0)
          return res
            .status(409)
            .json({ error: "Na tuto e-mailovou adresu je již založený účet" });

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (login, email, password) VALUES (?, ?, ?)",
          [login, email, hashedPassword],
          (err2) => {
            if (err2)
              return res.status(500).json({ error: "Chyba při zápisu do DB" });
            res.status(201).json({ message: "Registrace úspěšná" });
          },
        );
      },
    );
  } catch {
    res.status(500).json({ error: "Chyba při zpracování dat" });
  }
});

// Přihlášení – vrátí JWT token
router.post("/login", (req, res) => {
  const { login, password } = req.body;

  db.query(
    `SELECT users.*, role.role_name
     FROM users
     LEFT JOIN role ON users.role_id = role.id
     WHERE login = ?`,
    [login],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!results.length)
        return res.status(401).json({ error: "Uživatel nenalezen" });

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Nesprávné heslo" });

      const token = jwt.sign(
        { id: user.id, login: user.login, role: user.role_name },
        SECRET_KEY,
        { expiresIn: "1h" },
      );

      res.json({ message: "Přihlášení úspěšné", token });
    },
  );
});

// ─── CHRÁNĚNÉ ENDPOINTY ───

// Informace o přihlášeném uživateli
router.get("/me", verifyToken, (req, res) => {
  db.query(
    `SELECT users.id, users.login, users.email, users.phone, role.role_name,
            fighters.id AS fighter_id,
            fighters.name, fighters.surname,
            DATE_FORMAT(fighters.birth, '%d.%m.%Y') AS birth,
            fighters.img_path, fighters.actual_weight_category
     FROM users
     LEFT JOIN role ON users.role_id = role.id
     LEFT JOIN fighters ON users.fighter_id = fighters.id
     WHERE users.id = ?`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!results.length) return res.status(404).json({ error: "Uživatel nenalezen" });

      const user = results[0];

      // Pokud nemá přiřazeného závodníka, vrať bez výsledků
      if (!user.fighter_id) {
        return res.json({
          id: user.id,
          login: user.login,
          email: user.email,
          phone: user.phone,
          role: user.role_name,
          name: user.name,
          surname: user.surname,
          birth: user.birth,
          img_path: user.img_path,
          actual_weight_category: user.actual_weight_category,
          tournament_results: [],
        });
      }

      // Načti výsledky závodníka
      db.query(
        `SELECT 
            tr.place,
            t.name AS tournament,
            DATE_FORMAT(t.start_date, '%d.%m.%Y') AS date
         FROM tournament_registration tr
         JOIN tournament t ON t.id = tr.tournament_id
         WHERE tr.fighter_id = ? AND tr.place IS NOT NULL
         ORDER BY t.start_date DESC`,
        [user.fighter_id],
        (err2, results2) => {
          if (err2) return res.status(500).json({ error: "Chyba serveru" });

          res.json({
            id: user.id,
            login: user.login,
            email: user.email,
            phone: user.phone,
            role: user.role_name,
            name: user.name,
            surname: user.surname,
            birth: user.birth,
            img_path: user.img_path,
            actual_weight_category: user.actual_weight_category,
            tournament_results: results2,
          });
        }
      );
    }
  );
});

// PUT /auth/me – úprava vlastního profilu
router.put("/me", verifyToken, async (req, res) => {
  const {
    name,
    surname,
    phone,
    actual_weight_category,
    currentPassword,
    newPassword,
  } = req.body;

  try {
    // Pokud chce měnit heslo
    if (newPassword) {
      // Načti aktuální hash hesla
      db.query(
        "SELECT password FROM users WHERE id = ?",
        [req.user.id],
        async (err, results) => {
          if (err) return res.status(500).json({ error: "Chyba serveru" });

          const isMatch = await bcrypt.compare(
            currentPassword,
            results[0].password,
          );
          if (!isMatch)
            return res
              .status(401)
              .json({ error: "Stávající heslo je nesprávné" });

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          db.query(
            `UPDATE users 
           LEFT JOIN fighters ON fighters.id = users.fighter_id
           SET fighters.name = ?, fighters.surname = ?, users.phone = ?,
               fighters.actual_weight_category = ?, users.password = ?
           WHERE users.id = ?`,
            [
              name,
              surname,
              phone,
              actual_weight_category,
              hashedPassword,
              req.user.id,
            ],
            (err2) => {
              if (err2)
                return res.status(500).json({ error: "Chyba při ukládání" });
              res.json({ success: true, message: "Profil byl upraven" });
            },
          );
        },
      );
    } else {
      // Bez změny hesla
      db.query(
        `UPDATE users 
         LEFT JOIN fighters ON fighters.id = users.fighter_id
         SET fighters.name = ?, fighters.surname = ?, users.phone = ?,
             fighters.actual_weight_category = ?
         WHERE users.id = ?`,
        [name, surname, phone, actual_weight_category, req.user.id],
        (err) => {
          if (err) return res.status(500).json({ error: "Chyba při ukládání" });
          res.json({ success: true, message: "Profil byl upraven" });
        },
      );
    }
  } catch {
    res.status(500).json({ error: "Interní chyba serveru" });
  }
});

module.exports = router;
