require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = require("./Routes/Router");

const app = express();


// https://www.youtube.com/watch?v=mbsmsi7l3r4&t=298s

// Povolení CORS pro frontend na portu 5173
const corsOptions = {
  origin: "http://localhost:5173", // Povolit požadavky z React aplikace běžící na portu 5173
  // origin: 'http://localhost:5174',
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Použití CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

//app.use("/api", router);
app.use("/api", router);

// Tajný klíč pro JWT
const SECRET_KEY = process.env.JWT_SECRET || "tajnyklic";

// Úvodní stránka
app.get("/", (req, res) => {
  res.send("Server běží správně! 🚀");
});

// Registrace uživatele
app.post("/tests", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Přihlášení uživatele
app.post("/login", (req, res) => {
  // const { username, password } = req.body;
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.ACCES_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});



// Spuštění serveru
app.listen(4000, () => console.log("🚀 Server běží na http://localhost:4000"));
