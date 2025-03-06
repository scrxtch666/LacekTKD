require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Připojení k databázi
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // změň podle svého nastavení
    password: '', // změň podle svého nastavení
    database: 'users_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('🟢 MySQL připojeno');
});

// Tajný klíč pro JWT
const SECRET_KEY = process.env.JWT_SECRET || 'tajnyklic';

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
