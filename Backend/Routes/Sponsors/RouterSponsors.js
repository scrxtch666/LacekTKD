const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");

const router = express.Router();

// Multer konfigurace
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "C:\\LacekTKD\\Frontend\\public\\uploads\\sponsors";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "sponsor-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Pouze obrázky jsou povoleny!"));
  },
});

// GET - všichni sponzoři
router.get("/", (req, res) => {
  db.query("SELECT * FROM sponsors ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při načítání sponzorů" });
    res.json(results);
  });
});

// POST - přidání sponzora
router.post("/", upload.single("image"), (req, res) => {
  const { sponsor_name, url } = req.body;

  if (!sponsor_name || !req.file) {
    return res.status(400).json({ error: "Chybí název nebo obrázek" });
  }

  const img_path = `/uploads/sponsors/${req.file.filename}`;

  db.query(
    "INSERT INTO sponsors (sponsor_name, url, img_path) VALUES (?, ?, ?)",
    [sponsor_name, url || null, img_path],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání do DB:", err);
        return res.status(500).json({ error: "Chyba při ukládání do databáze" });
      }
      res.status(201).json({
        success: true,
        message: "Sponzor byl úspěšně přidán",
        id: result.insertId,
        img_path,
      });
    }
  );
});

// PUT - úprava sponzora
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { sponsor_name, url } = req.body;

  if (!sponsor_name) {
    return res.status(400).json({ error: "Chybí název sponzora" });
  }

  // Pokud přišel nový obrázek, smažeme starý a uložíme nový
  if (req.file) {
    db.query("SELECT img_path FROM sponsors WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba při hledání sponzora" });
      if (results.length === 0) return res.status(404).json({ error: "Sponzor nenalezen" });

      // Smažeme starý soubor
      const oldPath = path.join("C:\\LacekTKD\\Frontend\\public", results[0].img_path);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const new_img_path = `/uploads/sponsors/${req.file.filename}`;

      db.query(
        "UPDATE sponsors SET sponsor_name = ?, url = ?, img_path = ? WHERE id = ?",
        [sponsor_name, url || null, new_img_path, id],
        (err) => {
          if (err) return res.status(500).json({ error: "Chyba při aktualizaci databáze" });
          res.json({ success: true, message: "Sponzor byl upraven", img_path: new_img_path });
        }
      );
    });
  } else {
    // Bez nového obrázku – aktualizujeme jen název a URL
    db.query(
      "UPDATE sponsors SET sponsor_name = ?, url = ? WHERE id = ?",
      [sponsor_name, url || null, id],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Chyba při aktualizaci databáze" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Sponzor nenalezen" });
        res.json({ success: true, message: "Sponzor byl upraven" });
      }
    );
  }
});

// DELETE - smazání sponzora
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT img_path FROM sponsors WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při hledání sponzora" });
    if (results.length === 0) return res.status(404).json({ error: "Sponzor nenalezen" });

    const imgPath = results[0].img_path;
    const fullPath = path.join("C:\\LacekTKD\\Frontend\\public", imgPath);

    db.query("DELETE FROM sponsors WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Chyba při mazání z databáze" });

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log("Soubor smazán:", fullPath);
      }

      res.json({ success: true, message: "Sponzor byl úspěšně smazán" });
    });
  });
});

module.exports = router;