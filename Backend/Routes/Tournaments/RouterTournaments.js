require("dotenv").config();
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "tajnyklic";
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../Libs/db");
const { google } = require("googleapis");
const { verifyToken } = require("../../auth/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ─── GOOGLE CALENDAR SETUP ───
// Vlož cestu ke svému service account JSON souboru
const GOOGLE_SERVICE_ACCOUNT_KEY = path.join(
  __dirname,
  "../../lacektkd-12aaabdf5383.json",
);
// Vlož Calendar ID svého Google Kalendáře
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const getGoogleCalendarClient = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_SERVICE_ACCOUNT_KEY,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
};

// Vytvoří event v Google Kalendáři, vrátí google_event_id
const createGoogleEvent = async (tournament) => {
  try {
    console.log("📅 Vytvářím Google event...");
    console.log("📅 Calendar ID:", CALENDAR_ID);
    console.log("📅 JSON klíč:", GOOGLE_SERVICE_ACCOUNT_KEY);
    console.log(
      "📅 Soubor existuje:",
      fs.existsSync(GOOGLE_SERVICE_ACCOUNT_KEY),
    );

    const calendar = getGoogleCalendarClient();
    const event = {
      summary: tournament.name,
      location: tournament.location || "",
      description: tournament.info || "",
      start: { date: tournament.start_date, timeZone: "Europe/Prague" },
      end: {
        date: tournament.end_date || tournament.start_date,
        timeZone: "Europe/Prague",
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });

    console.log("✅ Event vytvořen! ID:", response.data.id);
    return response.data.id;
  } catch (err) {
    console.error("❌ Chyba:", err.message);
    console.error("❌ Detail:", err.errors || err.code);
    return null;
  }
};

// Aktualizuje existující event v Google Kalendáři
const updateGoogleEvent = async (googleEventId, tournament) => {
  if (!googleEventId) return;
  try {
    const calendar = getGoogleCalendarClient();
    await calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId: googleEventId,
      resource: {
        summary: tournament.name,
        location: tournament.location || "",
        description: tournament.info || "",
        start: {
          date: tournament.start_date,
          timeZone: "Europe/Prague",
        },
        end: {
          date: tournament.end_date || tournament.start_date,
          timeZone: "Europe/Prague",
        },
      },
    });
  } catch (err) {
    console.error(
      "Google Calendar – chyba při aktualizaci eventu:",
      err.message,
    );
  }
};

// Smaže event z Google Kalendáře
const deleteGoogleEvent = async (googleEventId) => {
  if (!googleEventId) return;
  try {
    const calendar = getGoogleCalendarClient();
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: googleEventId,
    });
  } catch (err) {
    console.error("Google Calendar – chyba při mazání eventu:", err.message);
  }
};

// ─── MULTER ───
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

// ─── ROUTES ───

router.get("/calendar", (req, res) => {
  const { month } = req.query;
  const token = req.headers["authorization"]?.split(" ")[1];

  let userRole = "guest";
  if (token) {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      userRole = payload.role;
    } catch {}
  }

  const isAdminOrTrainer = userRole === "admin" || userRole === "trainer";

  // Admin/trainer vidí vše, ostatní pouze completed
  let whereClause = isAdminOrTrainer ? "WHERE 1=1" : "WHERE tournament.status = 'completed'";
  let params = [];

  if (month) {
    const monthFilter = `(
      DATE_FORMAT(tournament.start_date, '%Y-%m') = ? OR
      DATE_FORMAT(tournament.end_date, '%Y-%m') = ? OR
      (tournament.start_date <= LAST_DAY(?) AND tournament.end_date >= ?)
    )`;
    whereClause = isAdminOrTrainer
      ? `WHERE ${monthFilter}`
      : `WHERE tournament.status = 'completed' AND ${monthFilter}`;
    const firstDay = month + "-01";
    params = [month, month, firstDay, firstDay];
  }

  db.query(
    `SELECT
        tournament.id,
        tournament.name,
        tournament.location,
        tournament.price,
        tournament.info,
        tournament.img_path,
        tournament.status,
        tournament.type_id,
        type.name AS type_name,
        DATE_FORMAT(tournament.start_date, '%Y-%m-%d') AS start_date,
        DATE_FORMAT(tournament.end_date, '%Y-%m-%d') AS end_date,
        tournament.google_event_id
     FROM tournament
     LEFT JOIN type ON tournament.type_id = type.id
     ${whereClause}
     ORDER BY tournament.start_date ASC`,
    params,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Chyba při načítání turnajů" });
      res.json(results);
    }
  );
});

// GET / – všechny turnaje
router.get("/", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  let userId = null;
  if (token) {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      userId = payload.id;
      console.log("✅ Token OK, userId:", userId); // ← přidej
    } catch (err) {
      console.log("❌ Token error:", err.message); // ← přidej
    }
  } else {
    console.log("⚠️ Žádný token"); // ← přidej
  }

  const isRegisteredSQL = userId
    ? `(SELECT COUNT(*) FROM tournament_registration tr 
     WHERE tr.tournament_id = tournament.id 
     AND tr.fighter_id = (SELECT fighter_id FROM users WHERE id = ${db.escape(userId)})
    ) AS is_registered`
    : `0 AS is_registered`;

  db.query(
    `SELECT
        tournament.id,
        tournament.name,
        tournament.location,
        tournament.price,
        tournament.info,
        tournament.img_path,
        DATE_FORMAT(tournament.registrable_date, '%d.%m.%Y') AS registrable_date_formatted,
        tournament.registrable_date AS registrable_date_raw,
        tournament.status,
        tournament.type_id,
        type.name AS type_name,
        DATE_FORMAT(tournament.start_date, '%d.%m.') AS start_date_formatted,
        DATE_FORMAT(tournament.end_date, '%d.%m.%Y') AS end_date_formatted,
        tournament.start_date AS start_date_raw,
        tournament.end_date AS end_date_raw,
        ${isRegisteredSQL}
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

router.delete("/:id/register", verifyToken, (req, res) => {
  const tournamentId = req.params.id;

  // Kontrola, zda už není po uzávěrce
  db.query(
    "SELECT registrable_date FROM tournament WHERE id = ?",
    [tournamentId],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(500).json({ error: "Chyba serveru" });

      const deadline = new Date(results[0].registrable_date);
      deadline.setHours(23, 59, 59, 999);

      if (new Date() > deadline) {
        return res
          .status(403)
          .json({ error: "Po uzávěrce se již nelze odhlásit!" });
      }

      // Pokud je OK, smažeme registraci
      db.query(
        `DELETE tr FROM tournament_registration tr
         JOIN users u ON u.fighter_id = tr.fighter_id
         WHERE tr.tournament_id = ? AND u.id = ?`,
        [tournamentId, req.user.id],
        (err2) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při odhlašování" });
          res.json({ success: true });
        },
      );
    },
  );
});

router.put("/:id/status", verifyToken, (req, res) => {
  const { status } = req.body;
  if (!["completed", "uncompleted"].includes(status))
    return res.status(400).json({ error: "Neplatný status" });

  db.query(
    "UPDATE tournament SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Chyba serveru" });
      res.json({ success: true });
    },
  );
});

// GET /latest – poslední turnaj
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

// GET /types – typy pro select
router.get("/types", (req, res) => {
  db.query("SELECT * FROM type ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "Chyba při načítání typů" });
    res.json(results);
  });
});

// GET /:id – detail turnaje
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT tournament.*, type.name AS type_name,
        tournament.start_date AS start_date_raw,
        tournament.end_date AS end_date_raw
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

// POST / – přidání turnaje + Google Calendar
router.post("/", upload.single("image"), async (req, res) => {
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

  // Vytvoř event v Google Kalendáři
  const googleEventId = await createGoogleEvent({
    name,
    location,
    info,
    start_date: start_date || null,
    end_date: end_date || start_date || null,
  });

  db.query(
    `INSERT INTO tournament (name, location, price, type_id, start_date, end_date, registrable_date, info, img_path, google_event_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      googleEventId,
    ],
    (err, result) => {
      if (err) {
        console.error("Chyba při ukládání turnaje:", err);
        return res
          .status(500)
          .json({ error: "Chyba při ukládání do databáze" });
      }
      res.status(201).json({
        success: true,
        message: "Turnaj byl úspěšně přidán",
        id: result.insertId,
        google_event_id: googleEventId,
      });
    },
  );
});

// PUT /:id – editace turnaje + Google Calendar
router.put("/:id", upload.single("image"), async (req, res) => {
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

  // Načti stávající google_event_id
  db.query(
    "SELECT img_path, google_event_id FROM tournament WHERE id = ?",
    [id],
    async (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při hledání turnaje" });
      if (!results.length)
        return res.status(404).json({ error: "Turnaj nenalezen" });

      const { google_event_id, img_path: oldImg } = results[0];

      // Aktualizuj Google Calendar event
      await updateGoogleEvent(google_event_id, {
        name,
        location,
        info,
        start_date: start_date || null,
        end_date: end_date || start_date || null,
      });

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

        db.query(query, params, (err2, result) => {
          if (err2)
            return res
              .status(500)
              .json({ error: "Chyba při aktualizaci turnaje" });
          if (result.affectedRows === 0)
            return res.status(404).json({ error: "Turnaj nenalezen" });
          res.json({ success: true, message: "Turnaj byl úspěšně upraven" });
        });
      };

      if (req.file) {
        // Smaž starý obrázek
        if (oldImg) {
          const fullOldPath = path.join(
            "C:\\LacekTKD\\Frontend\\public",
            oldImg,
          );
          if (fs.existsSync(fullOldPath)) fs.unlinkSync(fullOldPath);
        }
        doUpdate("/uploads/tournaments/" + req.file.filename);
      } else {
        doUpdate(undefined);
      }
    },
  );
});

router.post("/:id/register", verifyToken, (req, res) => {
  db.query(
    `SELECT u.fighter_id, f.name, f.surname, f.birth, f.actual_weight_category
     FROM users u
     LEFT JOIN fighters f ON f.id = u.fighter_id
     WHERE u.id = ?`,
    [req.user.id],
    (err, results) => {
      if (err || !results.length)
        return res.status(400).json({ error: "Uživatel nenalezen" });

      const { fighter_id, name, surname, birth, actual_weight_category } = results[0];

      if (!fighter_id)
        return res.status(400).json({ error: "Nemáš přiřazeného závodníka. Kontaktuj trenéra." });
      if (!name || !surname)
        return res.status(400).json({ error: "Závodník nemá vyplněné jméno a příjmení. Kontaktuj trenéra." });
      if (!birth || birth.toString().startsWith("0000"))
        return res.status(400).json({ error: "Závodník nemá vyplněné datum narození. Kontaktuj trenéra." });
      if (!actual_weight_category)
        return res.status(400).json({ error: "Závodník nemá vyplněnou váhovou kategorii. Kontaktuj trenéra nebo ji doplň v profilu." });

      db.query(
        "INSERT INTO tournament_registration (tournament_id, fighter_id) VALUES (?, ?)",
        [req.params.id, fighter_id],
        (err2) => {
          if (err2)
            return res.status(500).json({ error: "Chyba při přihlašování na turnaj" });
          res.json({ success: true });
        }
      );
    }
  );
});

// DELETE /:id – smazání turnaje + Google Calendar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT img_path, google_event_id FROM tournament WHERE id = ?",
    [id],
    async (err, results) => {
      if (err)
        return res.status(500).json({ error: "Chyba při hledání turnaje" });
      if (!results.length)
        return res.status(404).json({ error: "Turnaj nenalezen" });

      const { google_event_id, img_path } = results[0];

      // Smaž z Google Kalendáře
      await deleteGoogleEvent(google_event_id);

      db.query("DELETE FROM tournament WHERE id = ?", [id], (err2) => {
        if (err2)
          return res.status(500).json({ error: "Chyba při mazání turnaje" });

        // Smaž fyzický soubor obrázku
        if (img_path) {
          const fullPath = path.join(
            "C:\\LacekTKD\\Frontend\\public",
            img_path,
          );
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }

        res.json({ success: true, message: "Turnaj byl úspěšně smazán" });
      });
    },
  );
});

module.exports = router;
