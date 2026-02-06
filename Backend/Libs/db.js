/*
const mysql = require('mysql2');
require('dotenv').config();

const db = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    connection.connect(err => {
        if (err) throw err;
        console.log('🟢 MySQL připojeno');
    });
    return connection;
}

module.exports = db;
*/

const mysql = require('mysql2');
require('dotenv').config();

// 1. Vytvoříme spojení hned (jen jednou)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('🔴 MySQL se nepodařilo připojit:', err.message);
        return;
    }
    console.log('🟢 MySQL připojeno a připraveno!');
});

// 2. Exportujeme hotový objekt, ne návod (funkci)
module.exports = db;