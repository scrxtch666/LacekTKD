const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");

const router = express.Router();

// --- MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "C:\\LacekTKD\\Frontend\\public\\uploads\\fighters";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "fighter-" + uniqueSuffix + path.extname(file.originalname));
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
    cb(new Error("Pouze obrazky jsou povoleny!"));
  },
});

// GET / - verejny vypis zavodnikua (puvodni route zachovana)
router.get("/", async (req, res) => {
  db.query(
    `SELECT 
        fighters.id, fighters.img_path, fighters.name, fighters.surname,
        fighters.birth, fighters.best, fighters.legend, fighters.active,
        fighters.actual_weight_category, fighters.belts_id, fighters.category_id,
        TIMESTAMPDIFF(YEAR, fighters.birth, CURDATE()) AS age,
        belts.cup, belts.img_path AS belt_path,
        users.id AS user_id, users.login AS user_login,
        users.email AS user_email, users.phone AS user_phone
     FROM fighters
     JOIN belts ON fighters.belts_id = belts.id
     LEFT JOIN users ON users.fighter_id = fighters.id`,
    (err, fighters) => {
      if (err) return res.status(500).json({ error: "Chyba" });

      // Druhý dotaz – všechny výsledky najednou
      db.query(
        `SELECT 
            tr.tournament_id,
            tr.fighter_id,
            tr.place,
            t.name AS tournament,
            DATE_FORMAT(t.start_date, '%d.%m.%Y') AS date
         FROM tournament_registration tr
         JOIN tournament t ON t.id = tr.tournament_id
         WHERE tr.place IS NOT NULL
         ORDER BY t.start_date DESC`,
        (err2, results) => {
          if (err2) return res.status(500).json({ error: "Chyba" });

          // Spoj v JavaScriptu
          const parsed = fighters.map((fighter) => ({
            ...fighter,
            tournament_results: results
              .filter((r) => r.fighter_id === fighter.id)
              .slice(0, 3),
          }));

          res.json(parsed);
        },
      );
    },
  );
});

// GET /countAll - pocet zavodniku (puvodni route zachovana)
router.get("/countAll", (req, res) => {
  db.query("SELECT COUNT(id) AS count FROM fighters", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ count: result[0].count });
  });
});

// POST / - pridani zavodnika
router.post("/", upload.single("image"), (req, res) => {
  const {
    name,
    surname,
    birth,
    belts_id,
    category_id,
    actual_weight_category,
    best,
    legend,
    active,
    user_id,
  } = req.body;

  if (!name || !surname) {
    return res.status(400).json({ error: "Chybi jmeno nebo prijmeni" });
  }

  const img_path = req.file ? "/uploads/fighters/" + req.file.filename : null;

  db.query(
    "INSERT INTO fighters (name, surname, birth, belts_id, img_path, best, legend, active, category_id, actual_weight_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      surname,
      birth || null,
      belts_id || null,
      img_path,
      best === "1" ? 1 : 0,
      legend === "1" ? 1 : 0,
      active === "1" ? 1 : 0,
      category_id || null,
      actual_weight_category || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Chyba pri ukladani fightera:", err);
        return res
          .status(500)
          .json({ error: "Chyba pri ukladani do databaze" });
      }

      const newFighterId = result.insertId;

      if (user_id && user_id !== "null" && user_id !== "") {
        db.query(
          "UPDATE users SET fighter_id = ? WHERE id = ?",
          [newFighterId, user_id],
          (err2) => {
            if (err2) console.error("Chyba pri prirazeni usera:", err2);
          },
        );
      }

      res.status(201).json({
        success: true,
        message: "Zavodnik byl uspesne pridan",
        id: newFighterId,
        img_path,
      });
    },
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // 1. detail závodníka
  db.query(
    `SELECT 
        f.id, f.img_path, f.name, f.surname,
        f.birth, f.best, f.legend, f.active,
        f.actual_weight_category, f.belts_id, f.category_id,
        TIMESTAMPDIFF(YEAR, f.birth, CURDATE()) AS age,
        b.cup, b.img_path AS belt_path,
        u.id AS user_id, u.login AS user_login,
        u.email AS user_email, u.phone AS user_phone,
        c.name AS category_name,
        c.min,
        c.max
     FROM fighters f
     JOIN belts b ON f.belts_id = b.id
     LEFT JOIN users u ON u.fighter_id = f.id
     LEFT JOIN category c ON c.id = f.category_id
     WHERE f.id = ?`,
    [id],
    (err, fighterResults) => {
      if (err) return res.status(500).json({ error: "Chyba" });
      if (!fighterResults.length)
        return res.status(404).json({ error: "Závodník nenalezen" });

      const fighter = fighterResults[0];

      // 2. výsledky jen pro něj
      db.query(
        `SELECT 
            tr.tournament_id,
            tr.place,
            t.name AS tournament,
            DATE_FORMAT(t.start_date, '%d.%m.%Y') AS date
         FROM tournament_registration tr
         JOIN tournament t ON t.id = tr.tournament_id
         WHERE tr.place IS NOT NULL
           AND tr.fighter_id = ?
         ORDER BY t.start_date DESC
         LIMIT 4`,
        [id],
        (err2, results) => {
          if (err2) return res.status(500).json({ error: "Chyba" });

          fighter.tournament_results = results;

          res.json(fighter);
        },
      );
    },
  );
});

// PUT /:id - uprava zavodnika
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    name,
    surname,
    birth,
    belts_id,
    category_id,
    actual_weight_category,
    best,
    legend,
    active,
    user_id,
  } = req.body;

  if (!name || !surname) {
    return res.status(400).json({ error: "Chybi jmeno nebo prijmeni" });
  }

  const doUpdate = (new_img_path) => {
    const hasNewImg = new_img_path !== undefined;
    const query = hasNewImg
      ? "UPDATE fighters SET name=?, surname=?, birth=?, belts_id=?, img_path=?, best=?, legend=?, active=?, category_id=?, actual_weight_category=? WHERE id=?"
      : "UPDATE fighters SET name=?, surname=?, birth=?, belts_id=?, best=?, legend=?, active=?, category_id=?, actual_weight_category=? WHERE id=?";
    const params = hasNewImg
      ? [
          name,
          surname,
          birth || null,
          belts_id || null,
          new_img_path,
          best === "1" ? 1 : 0,
          legend === "1" ? 1 : 0,
          active === "1" ? 1 : 0,
          category_id || null,
          actual_weight_category || null,
          id,
        ]
      : [
          name,
          surname,
          birth || null,
          belts_id || null,
          best === "1" ? 1 : 0,
          legend === "1" ? 1 : 0,
          active === "1" ? 1 : 0,
          category_id || null,
          actual_weight_category || null,
          id,
        ];

    db.query(query, params, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Chyba pri aktualizaci zavodnika" });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Zavodnik nenalezen" });

      db.query(
        "UPDATE users SET fighter_id = NULL WHERE fighter_id = ?",
        [id],
        (err2) => {
          if (err2) console.error("Chyba pri odpojovani usera:", err2);
          if (user_id && user_id !== "null" && user_id !== "") {
            db.query(
              "UPDATE users SET fighter_id = ? WHERE id = ?",
              [id, user_id],
              (err3) => {
                if (err3) console.error("Chyba pri prirazeni usera:", err3);
              },
            );
          }
        },
      );

      res.json({ success: true, message: "Zavodnik byl upraven" });
    });
  };

  if (req.file) {
    db.query(
      "SELECT img_path FROM fighters WHERE id = ?",
      [id],
      (err, results) => {
        if (err)
          return res.status(500).json({ error: "Chyba pri hledani zavodnika" });
        if (results.length === 0)
          return res.status(404).json({ error: "Zavodnik nenalezen" });
        const oldImg = results[0].img_path;
        if (oldImg) {
          const fullOldPath = path.join(
            "C:\\LacekTKD\\Frontend\\public",
            oldImg,
          );
          if (fs.existsSync(fullOldPath)) fs.unlinkSync(fullOldPath);
        }
        doUpdate("/uploads/fighters/" + req.file.filename);
      },
    );
  } else {
    doUpdate(undefined);
  }
});

// DELETE /:id - smazani zavodnika
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT img_path FROM fighters WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba pri hledani zavodnika" });
      if (results.length === 0)
        return res.status(404).json({ error: "Zavodnik nenalezen" });

      const imgPath = results[0].img_path;

      db.query(
        "UPDATE users SET fighter_id = NULL WHERE fighter_id = ?",
        [id],
        (err2) => {
          if (err2) console.error("Chyba pri odpojovani useru:", err2);

          db.query("DELETE FROM fighters WHERE id = ?", [id], (err3) => {
            if (err3)
              return res
                .status(500)
                .json({ error: "Chyba pri mazani zavodnika" });

            if (imgPath) {
              const fullPath = path.join(
                "C:\\LacekTKD\\Frontend\\public",
                imgPath,
              );
              if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log("Soubor smazan:", fullPath);
              }
            }

            res.json({ success: true, message: "Zavodnik byl uspesne smazan" });
          });
        },
      );
    },
  );
});

module.exports = router;
