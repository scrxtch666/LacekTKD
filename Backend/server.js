require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Použití externích rout (pokud máš další v Router.js)
app.use("/api", router);

// Tajný klíč z .env (opraven název pro konzistenci)
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";

// --- KONFIGURACE MULTER PRO UPLOAD BANNERŮ ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "C:\\LacekTKD\\Frontend\\public\\uploads\\banners";
    
    // Vytvoř složku, pokud neexistuje
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "banner-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Pouze obrázky jsou povoleny!"));
    }
  },
});

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
        if (err) return res.status(500).json({ error: "Chyba serveru při kontrole e-mailu" });

        if (results.length > 0) {
          // E-mail už existuje – vracíme chybu
          return res.status(409).json({ error: "Na tuto e-mailovou adresu je již založený účet" });
        }

        // 2. Pokud neexistuje, pokračujeme v hashování a zápisu
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (login, email, password) VALUES (?, ?, ?)",
          [login, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ error: "Chyba při zápisu do DB" });
            res.status(201).json({ message: "Registrace úspěšná" });
          }
        );
      }
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

      // --- TADY JE TEN VÝPIS DO KONZOLE ---
      console.log("-----------------------------------------");
      console.log(`Uživatel ${user.login} se přihlásil.`);
      console.log("Vygenerovaný JWT Token:");
      console.log(token);
      console.log("-----------------------------------------");

      res.json({ message: "Přihlášení úspěšné", token });
    }
  );
});

// --- BANNER ENDPOINTY ---

// POST - Přidání nového banneru
app.post("/api/banner", upload.single("image"), (req, res) => {
  const { banner_name } = req.body;

  if (!banner_name || !req.file) {
    return res.status(400).json({ error: "Chybí název nebo obrázek" });
  }

  // Uložíme relativní cestu pro použití v Reactu
  const img_path = `/uploads/banners/${req.file.filename}`;

  db.query(
    "INSERT INTO banner (banner_name, img_path) VALUES (?, ?)",
    [banner_name, img_path],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání do DB:", err);
        return res.status(500).json({ error: "Chyba při ukládání do databáze" });
      }

      res.status(201).json({
        success: true,
        message: "Banner byl úspěšně přidán",
        id: result.insertId,
        img_path: img_path,
      });
    }
  );
});

// DELETE - Smazání banneru
app.delete('/api/banner/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Nejdřív získáme cestu k obrázku pro smazání ze souboru
    db.query(
      "SELECT img_path FROM banner WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Chyba při hledání banneru:", err);
          return res.status(500).json({ error: "Chyba při hledání banneru" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Banner nenalezen" });
        }

        const imgPath = results[0].img_path;
        const fullPath = path.join("C:\\LacekTKD\\Frontend\\public", imgPath);

        // Smažeme z databáze
        db.query(
          "DELETE FROM banner WHERE id = ?",
          [id],
          (err, result) => {
            if (err) {
              console.error("Chyba při mazání banneru:", err);
              return res.status(500).json({ error: "Chyba při mazání z databáze" });
            }

            // Smažeme soubor z disku
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
              console.log(`Soubor ${fullPath} byl smazán`);
            }

            res.json({ success: true, message: "Banner byl úspěšně smazán" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Chyba při zpracování:", error);
    res.status(500).json({ error: "Chyba serveru" });
  }
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