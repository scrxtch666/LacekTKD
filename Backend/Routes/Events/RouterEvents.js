const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");

const router = express.Router();

// --- MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "C:\\LacekTKD\\Frontend\\public\\uploads\\events";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "event-" +
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

// GET / - všechny aktuality (původní route zachována + rozšířena o fotky)
router.get("/", (req, res) => {
  db.query(
    `SELECT 
        e.id,
        e.title,
        e.body,
        e.status,
        e.photo AS cover_photo,
        e.user_id,
        u.login AS author,
        DATE_FORMAT(e.date_start, '%d.%m.%Y') AS date_start,
        e.created_at
     FROM event e
     LEFT JOIN users u ON e.user_id = u.id
     ORDER BY e.id DESC`,
    (err, events) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání aktualit" });
      if (!events.length) return res.json([]);

      db.query(
        "SELECT * FROM event_photos ORDER BY event_id, sort_order ASC",
        (err2, photos) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při načítání fotek" });

          const result = events.map((event) => ({
            ...event,
            photos: photos.filter((p) => p.event_id === event.id),
          }));

          res.json(result);
        },
      );
    },
  );
});

// GET /latest - poslední 3 aktuality (původní route zachována)
router.get("/latest", (req, res) => {
  db.query(
    `SELECT 
        e.id,
        e.title,
        e.body,
        e.photo AS cover_photo,
        DATE_FORMAT(e.date_start, '%d.%m.%Y') AS date_start
     FROM event e
     ORDER BY e.id DESC
     LIMIT 3`,
    (err, events) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání aktualit" });
      if (!events.length) return res.json([]);

      db.query(
        "SELECT * FROM event_photos ORDER BY event_id, sort_order ASC",
        (err2, photos) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při načítání fotek" });

          const result = events.map((event) => ({
            ...event,
            photos: photos.filter((p) => p.event_id === event.id),
          }));

          res.json(result);
        },
      );
    },
  );
});

// GET /:id - detail jedné aktuality
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT e.*, u.login AS author, DATE_FORMAT(e.date_start, '%d.%m.%Y') AS date_start_formatted
     FROM event e
     LEFT JOIN users u ON e.user_id = u.id
     WHERE e.id = ?`,
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při načítání aktuality" });
      if (!results.length)
        return res.status(404).json({ error: "Aktualita nenalezena" });

      const event = results[0];

      db.query(
        "SELECT * FROM event_photos WHERE event_id = ? ORDER BY sort_order ASC",
        [id],
        (err2, photos) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při načítání fotek" });
          res.json({ ...event, photos });
        },
      );
    },
  );
});

// POST / - přidání aktuality + fotky
router.post("/", upload.array("photos", 10), (req, res) => {
  const { title, body, status, date_start, user_id } = req.body;

  if (!title) return res.status(400).json({ error: "Chybí název aktuality" });

  db.query(
    `INSERT INTO event (title, body, status, date_start, user_id) VALUES (?, ?, ?, ?, ?)`,
    [
      title,
      body || null,
      status || "Availible",
      date_start || null,
      user_id || 1,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Chyba při ukládání aktuality" });

      const eventId = result.insertId;

      if (req.files && req.files.length > 0) {
        const photoValues = req.files.map((file, index) => [
          eventId,
          "/uploads/events/" + file.filename,
          index,
        ]);

        db.query(
          "INSERT INTO event_photos (event_id, img_path, sort_order) VALUES ?",
          [photoValues],
          (err2) => {
            if (err2) console.error("Chyba při ukládání fotek:", err2);
          },
        );
      }

      res
        .status(201)
        .json({
          success: true,
          message: "Aktualita byla úspěšně přidána",
          id: eventId,
        });
    },
  );
});

// PUT /:id - editace aktuality
router.put("/:id", upload.array("photos", 10), (req, res) => {
  const { id } = req.params;
  const { title, body, status, date_start } = req.body;

  if (!title) return res.status(400).json({ error: "Chybí název aktuality" });

  db.query(
    `UPDATE event SET title=?, body=?, status=?, date_start=? WHERE id=?`,
    [title, body || null, status || "Availible", date_start || null, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba při aktualizaci aktuality" });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Aktualita nenalezena" });

      // Přidej nové fotky ke stávajícím
      if (req.files && req.files.length > 0) {
        db.query(
          "SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM event_photos WHERE event_id = ?",
          [id],
          (err2, rows) => {
            if (err2) return;
            const startOrder = rows[0].maxOrder + 1;
            const photoValues = req.files.map((file, index) => [
              id,
              "/uploads/events/" + file.filename,
              startOrder + index,
            ]);
            db.query(
              "INSERT INTO event_photos (event_id, img_path, sort_order) VALUES ?",
              [photoValues],
            );
          },
        );
      }

      res.json({ success: true, message: "Aktualita byla úspěšně upravena" });
    },
  );
});

// DELETE /photo/:photoId - smazání jednotlivé fotky
router.delete("/photo/:photoId", (req, res) => {
  const { photoId } = req.params;

  db.query(
    "SELECT img_path FROM event_photos WHERE id = ?",
    [photoId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      if (!results.length)
        return res.status(404).json({ error: "Fotka nenalezena" });

      db.query("DELETE FROM event_photos WHERE id = ?", [photoId], (err2) => {
        if (err2)
          return res.status(500).json({ error: "Chyba při mazání fotky" });

        const fullPath = path.join(
          "C:\\LacekTKD\\Frontend\\public",
          results[0].img_path,
        );
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

        res.json({ success: true, message: "Fotka byla smazána" });
      });
    },
  );
});

// DELETE /:id - smazání celé aktuality (fotky v DB se smažou přes CASCADE)
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Načti cesty fotek před smazáním pro fyzické odstranění souborů
  db.query(
    "SELECT img_path FROM event_photos WHERE event_id = ?",
    [id],
    (err, photos) => {
      db.query("DELETE FROM event WHERE id = ?", [id], (err2, result) => {
        if (err2)
          return res.status(500).json({ error: "Chyba při mazání aktuality" });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "Aktualita nenalezena" });

        // Smaž fyzické soubory
        if (photos) {
          photos.forEach((photo) => {
            const fullPath = path.join(
              "C:\\LacekTKD\\Frontend\\public",
              photo.img_path,
            );
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
          });
        }

        res.json({ success: true, message: "Aktualita byla smazána" });
      });
    },
  );
});

module.exports = router;
