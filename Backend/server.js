require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./Libs/db");
const router = require("./Routes/Router");
const bannerRouter = require("./Routes/Banner/RouterBanner"); // IMPORT BANNER ROUTERU

const app = express();

// Konfigurace CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH", // Odstraň mezeru před PATCH
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Použití externích rout
app.use("/api", router);
app.use("/api/banner", bannerRouter); // BANNER ROUTER

// Tajný klíč z .env
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";

// Úvodní stránka
app.get("/", (req, res) => {
  res.send("Server běží správně! 🚀");
});

// --- ENDPOINTY ---

// 1. Registrace (Hashování a uložení)
app.post("/register", async (req, res) => {
  const { login, password, email } = req.body;

  try {
    // 1. Kontrola, zda e-mail již existuje
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Chyba serveru při kontrole e-mailu" });

        if (results.length > 0) {
          return res
            .status(409)
            .json({ error: "Na tuto e-mailovou adresu je již založený účet" });
        }

        // 2. Pokud neexistuje, pokračujeme v hashování a zápisu
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (login, email, password) VALUES (?, ?, ?)",
          [login, email, hashedPassword],
          (err, result) => {
            if (err)
              return res.status(500).json({ error: "Chyba při zápisu do DB" });
            res.status(201).json({ message: "Registrace úspěšná" });
          },
        );
      },
    );
  } catch (e) {
    res.status(500).json({ error: "Chyba při zpracování dat" });
  }
});

// 2. Přihlášení (Ověření a vygenerování JWT)
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE login = ?",
    [login],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (results.length === 0)
        return res.status(401).json({ error: "Uživatel nenalezen" });

      const user = results[0];

      // Bcrypt porovná zadané heslo s hashem v DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Nesprávné heslo" });

      // Vygenerování JWT tokenu
      const token = jwt.sign({ id: user.id, login: user.login }, SECRET_KEY, {
        expiresIn: "1h",
      });

      console.log("-----------------------------------------");
      console.log(`Uživatel ${user.login} se přihlásil.`);
      console.log("Vygenerovaný JWT Token:");
      console.log(token);
      console.log("-----------------------------------------");

      res.json({ message: "Přihlášení úspěšné", token });
    },
  );
});

// Endpoint pro získání informací o aktuálním uživateli
app.get("/api/user/me", verifyToken, (req, res) => {
  db.query(
    "SELECT id, login, email FROM users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (results.length === 0)
        return res.status(404).json({ error: "Uživatel nenalezen" });

      const user = results[0];
      res.json({
        id: user.id,
        login: user.login,
        email: user.email,
      });
    },
  );
});

// --- MIDDLEWARE PRO OCHRANU ROUT ---
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Chybí token" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Neplatný token" });
    req.user = user;
    next();
  });
}

// Ukázka chráněné cesty
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Vítej v zabezpečené zóně", user: req.user });
});

app.listen(3000, () => console.log("🚀 Server běží na http://localhost:3000"));
