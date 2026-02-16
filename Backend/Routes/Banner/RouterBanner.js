const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");

const router = express.Router();

// --- KONFIGURACE MULTER PRO UPLOAD BANNERŮ ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "C:\\LacekTKD\\Frontend\\public\\uploads\\banners";

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
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Pouze obrázky jsou povoleny!"));
    }
  },
});

// --- ENDPOINTY ---

// GET - Získání všech bannerů (s možností filtrace)
router.get("/", (req, res) => {
  const { active } = req.query;

  let query = "SELECT * FROM banner";
  let params = [];

  if (active === "true") {
    query += " WHERE active = ?";
    params.push(1);
  }

  query += " ORDER BY id DESC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Chyba při načítání bannerů:", err);
      return res.status(500).json({ error: "Chyba při načítání dat" });
    }
    res.json(results);
  });
});

// POST - Přidání nového banneru
router.post("/", upload.single("image"), (req, res) => {
  const { banner_name, active } = req.body;

  if (!banner_name || !req.file) {
    return res.status(400).json({ error: "Chybí název nebo obrázek" });
  }

  const img_path = `/uploads/banners/${req.file.filename}`;
  const isActive = active === "1" || active === true ? 1 : 0;

  db.query(
    "INSERT INTO banner (banner_name, img_path, active) VALUES (?, ?, ?)",
    [banner_name, img_path, isActive],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání do DB:", err);
        return res
          .status(500)
          .json({ error: "Chyba při ukládání do databáze" });
      }

      res.status(201).json({
        success: true,
        message: "Banner byl úspěšně přidán",
        id: result.insertId,
        img_path: img_path,
        active: isActive,
      });
    },
  );
});

// PATCH - Změna stavu banneru (aktivní/neaktivní)
router.patch("/:id/toggle", (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  db.query(
    "UPDATE banner SET active = ? WHERE id = ?",
    [active ? 1 : 0, id],
    (err, result) => {
      if (err) {
        console.error("Chyba při aktualizaci banneru:", err);
        return res.status(500).json({ error: "Chyba při aktualizaci banneru" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Banner nenalezen" });
      }

      res.json({
        success: true,
        message: `Banner byl ${active ? "aktivován" : "deaktivován"}`,
        active: active,
      });
    },
  );
});

// DELETE - Smazání banneru
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Nejdřív získáme cestu k obrázku
  db.query("SELECT img_path FROM banner WHERE id = ?", [id], (err, results) => {
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
    db.query("DELETE FROM banner WHERE id = ?", [id], (err, result) => {
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
    });
  });
});

module.exports = router;
