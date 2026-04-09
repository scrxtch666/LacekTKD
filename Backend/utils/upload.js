const multer = require("multer"); // ❗ Přidat import multer
const path = require("path");
const fs = require("fs");

// Root adresář projektu (tam kde je server.js)
//const ROOT_DIR = path.join(__dirname, "..");
const ROOT_DIR = path.join(__dirname, ".."); // pokud je upload.js v Backend/utils/


function createStorage(folder) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(ROOT_DIR, "public/uploads", folder);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        folder +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);
      cb(null, uniqueName);
    },
  });
}

// Vytvoří upload middleware pro konkrétní složku
function createUpload(folder) {
  return multer({
    storage: createStorage(folder),
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        cb(null, true);
      } else {
        cb(new Error("Pouze obrázky jsou povoleny!"));
      }
    },
  });
}

// Vrátí absolutní cestu k souboru (pro mazání)
function getFilePath(imgPath) {
  return path.join(ROOT_DIR, "public", imgPath);
}

module.exports = { createUpload, getFilePath };