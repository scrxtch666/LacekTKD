require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./Libs/db");
const router = require("./Routes/Router");

const app = express();

// Konfigurace CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// Použití externích rout (pokud máš další v Router.js)
app.use("/api", router);

// Tajný klíč z .env (opraven název pro konzistenci)
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";

// Úvodní stránka
app.get("/", (req, res) => {
  res.send("Server běží správně! 🚀");
});

// --- ENDPOINTY ---

// 1. Registrace (Hashování a uložení)
app.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    // Bcrypt vytvoří z hesla nečitelný hash
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (login, password) VALUES (?, ?)",
      [login, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Chyba při zápisu do DB" });
        res.status(201).json({ message: "Registrace úspěšná" });
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Chyba při zpracování hesla" });
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
      if (results.length === 0) return res.status(401).json({ error: "Uživatel nenalezen" });

      const user = results[0];

      // Bcrypt porovná zadané heslo s hashem v DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Nesprávné heslo" });

      // Vygenerování JWT tokenu - "průkazka" pro klienta
      const token = jwt.sign(
        { id: user.id, login: user.login },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ message: "Přihlášení úspěšné", token });
    }
  );
});

// --- MIDDLEWARE PRO OCHRANU ROUT ---
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Opraven překlep
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