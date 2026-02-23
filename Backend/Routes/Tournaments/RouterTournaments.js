const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");

const router = express.Router();

// --- MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "C:\\LacekTKD\\Frontend\\public\\uploads\\tournaments";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "tournament-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    if (
      allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype)
    ) {
      return cb(null, true);
    }
    cb(new Error("Pouze obrázky jsou povoleny!"));
  },
});

// GET / - všechny turnaje (pro veřejný frontend i admin)
router.get("/", (req, res) => {
  db.query(
    `SELECT 
        tournament.id,
        tournament.name,
        tournament.location,
        tournament.price,
        tournament.info,
        tournament.img_path,
        tournament.registrable_date,
        tournament.type_id,
        type.name AS type_name,
        DATE_FORMAT(tournament.start_date, '%d.%m.') AS start_date_formatted,
        DATE_FORMAT(tournament.end_date, '%d.%m.%Y') AS end_date_formatted,
        tournament.start_date AS start_date_raw,
        tournament.end_date AS end_date_raw
     FROM tournament
     LEFT JOIN type ON tournament.type_id = type.id
     ORDER BY tournament.start_date DESC`,
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání turnajů" });
      res.json(results);
    },
  );
});

// GET /latest - poslední turnaj (původní route zachována)
router.get("/latest", (req, res) => {
  db.query(
    `SELECT 
        tournament.id,
        tournament.name,
        tournament.location,
        tournament.price,
        tournament.info,
        tournament.img_path,
        type.name AS type_name,
        DATE_FORMAT(tournament.start_date, '%d.%m.') AS start_date,
        DATE_FORMAT(tournament.end_date, '%d.%m.%Y') AS end_date
     FROM tournament
     LEFT JOIN type ON tournament.type_id = type.id
     ORDER BY tournament.id DESC
     LIMIT 1`,
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání dat!" });
      res.json(results);
    },
  );
});

// GET /types - typy pro select ve formuláři
router.get("/types", (req, res) => {
  db.query("SELECT * FROM type ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při načítání typů" });
    res.json(results);
  });
});

// GET /:id - detail jednoho turnaje
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT tournament.*, type.name AS type_name
     FROM tournament
     LEFT JOIN type ON tournament.type_id = type.id
     WHERE tournament.id = ?`,
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání turnaje" });
      if (!results.length)
        return res.status(404).json({ error: "Turnaj nenalezen" });
      res.json(results[0]);
    },
  );
});

// POST / - přidání turnaje
router.post("/", upload.single("image"), (req, res) => {
  const {
    name,
    location,
    price,
    type_id,
    start_date,
    end_date,
    registrable_date,
    info,
  } = req.body;

  if (!name) return res.status(400).json({ error: "Chybí název turnaje" });

  const img_path = req.file
    ? "/uploads/tournaments/" + req.file.filename
    : null;

  db.query(
    `INSERT INTO tournament (name, location, price, type_id, start_date, end_date, registrable_date, info, img_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      location || null,
      price || null,
      type_id || null,
      start_date || null,
      end_date || null,
      registrable_date || null,
      info || null,
      img_path,
    ],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání turnaje:", err);
        return res
          .status(500)
          .json({ error: "Chyba při ukládání do databáze" });
      }
      res
        .status(201)
        .json({
          success: true,
          message: "Turnaj byl úspěšně přidán",
          id: result.insertId,
        });
    },
  );
});

// PUT /:id - editace turnaje
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    price,
    type_id,
    start_date,
    end_date,
    registrable_date,
    info,
  } = req.body;

  if (!name) return res.status(400).json({ error: "Chybí název turnaje" });

  const doUpdate = (new_img_path) => {
    const hasNewImg = new_img_path !== undefined;

    const query = hasNewImg
      ? `UPDATE tournament SET name=?, location=?, price=?, type_id=?, start_date=?, end_date=?, registrable_date=?, info=?, img_path=? WHERE id=?`
      : `UPDATE tournament SET name=?, location=?, price=?, type_id=?, start_date=?, end_date=?, registrable_date=?, info=? WHERE id=?`;

    const params = hasNewImg
      ? [
          name,
          location || null,
          price || null,
          type_id || null,
          start_date || null,
          end_date || null,
          registrable_date || null,
          info || null,
          new_img_path,
          id,
        ]
      : [
          name,
          location || null,
          price || null,
          type_id || null,
          start_date || null,
          end_date || null,
          registrable_date || null,
          info || null,
          id,
        ];

    db.query(query, params, (err, result) => {
      if (err)
        return res.status(500).json({ error: "Chyba při aktualizaci turnaje" });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Turnaj nenalezen" });
      res.json({ success: true, message: "Turnaj byl úspěšně upraven" });
    });
  };

  if (req.file) {
    // Smaž starý obrázek
    db.query(
      "SELECT img_path FROM tournament WHERE id = ?",
      [id],
      (err, results) => {
        if (err)
          return res.status(500).json({ error: "Chyba při hledání turnaje" });
        if (!results.length)
          return res.status(404).json({ error: "Turnaj nenalezen" });

        const oldImg = results[0].img_path;
        if (oldImg) {
          const fullOldPath = path.join(
            "C:\\LacekTKD\\Frontend\\public",
            oldImg,
          );
          if (fs.existsSync(fullOldPath)) fs.unlinkSync(fullOldPath);
        }
        doUpdate("/uploads/tournaments/" + req.file.filename);
      },
    );
  } else {
    doUpdate(undefined);
  }
});

// DELETE /:id - smazání turnaje
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT img_path FROM tournament WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při hledání turnaje" });
      if (!results.length)
        return res.status(404).json({ error: "Turnaj nenalezen" });

      db.query("DELETE FROM tournament WHERE id = ?", [id], (err2) => {
        if (err2)
          return res.status(500).json({ error: "Chyba při mazání turnaje" });

        const imgPath = results[0].img_path;
        if (imgPath) {
          const fullPath = path.join("C:\\LacekTKD\\Frontend\\public", imgPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }

        res.json({ success: true, message: "Turnaj byl úspěšně smazán" });
      });
    },
  );
});

module.exports = router;
