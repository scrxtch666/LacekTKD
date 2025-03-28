require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Přidání knihovny CORS

const app = express();

// Povolení CORS pro frontend na portu 5173
const corsOptions = {
    origin: 'http://localhost:5173',  // Povolit požadavky z React aplikace běžící na portu 5173
  // origin: 'http://localhost:5176',
   methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

// Použití CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Připojení k databázi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('🟢 MySQL připojeno');
});

// Tajný klíč pro JWT
const SECRET_KEY = process.env.JWT_SECRET || 'tajnyklic';

// Úvodní stránka
app.get('/', (req, res) => {
    res.send('Server běží správně! 🚀');
});

// Registrace uživatele
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hashování hesla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Uložení do databáze
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Chyba při registraci' });
        res.status(201).json({ message: 'Registrace úspěšná' });
    });
});

// Přihlášení uživatele
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba serveru' });
        if (results.length === 0) return res.status(401).json({ error: 'Neplatné přihlašovací údaje' });

        const user = results[0];

        // Ověření hesla
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Neplatné přihlašovací údaje' });

        // Vytvoření JWT tokenu
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Přihlášení úspěšné', token });
    });
});

// Získání všech turnajů a soustředění
app.get('/events', (req, res) => {
    db.query(`SELECT name, location, price, type, 
          DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start, 
          DATE_FORMAT(date_end, '%d.%m.%Y') AS date_end, 
          info 
   FROM tournaments`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});

// Získání posledního turnaje
app.get('/events/latest', (req, res) => {
    db.query(`SELECT name, location, price, type, 
          DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start, 
          DATE_FORMAT(date_end, '%d.%m.%Y') AS date_end, 
          info 
   FROM tournaments ORDER BY id DESC limit 1`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});

// Získání všech pásků
app.get('/belts', (req, res) => {
    db.query(`SELECT korean_name, cup, price, img_path
   FROM belt`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});

// Získání všech trenérů
app.get('/coach', (req, res) => {
    db.query(`SELECT *
   FROM coach`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});

// Získání všech pásků
app.get('/news', (req, res) => {
    db.query(`SELECT news_name,
        DATE_FORMAT(date_start, '%d.%m.%Y') AS date_start, 
          DATE_FORMAT(date_end, '%d.%m.%Y') AS date_end, text,
          img_path
   FROM news`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});

// Získání závodníků
app.get('/fighters', (req, res) => {
    db.query(`SELECT first_name, last_name, belt, profile_pic_path
   FROM fighters WHERE belt = '2.DAN';`, (err, results) => {
        if (err) return res.status(500).json({ error: 'Chyba při načítání turnajů a soustředění' });
        res.json(results);
    });
});


app.get("/fighters/count", (req, res) => {
    db.query("SELECT COUNT(ID) AS count FROM fighters WHERE belt = '2.DAN';", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: result[0].count });
    });
});

app.get("/fighters/countAll", (req, res) => {
    db.query("SELECT COUNT(ID) AS count FROM fighters;", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: result[0].count });
    });
});
// Middleware pro ověření tokenu
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Přístup zamítnut' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Neplatný token' });
        req.user = user;
        next();
    });
};

// Chráněná cesta (přístupná jen pro přihlášené uživatele)
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Toto je chráněná data', user: req.user });
});

// Spuštění serveru
app.listen(3000, () => console.log('🚀 Server běží na http://localhost:3000'));
