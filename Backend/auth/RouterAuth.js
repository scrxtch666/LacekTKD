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
    `SELECT users.id, users.login, users.email, users.phone, role.role_name, fighters.name, fighters.surname,  DATE_FORMAT(fighters.birth, '%d.%m.%Y') AS birth, fighters.img_path, fighters.actual_weight_category
     FROM users
     LEFT JOIN role ON users.role_id = role.id
     LEFT JOIN fighters ON users.fighter_id = fighters.id
     WHERE users.id = ?`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!results.length)
        return res.status(404).json({ error: "Uživatel nenalezen" });

      const user = results[0];
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
      });
    },
  );
});

module.exports = router;
