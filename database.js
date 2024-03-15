// database.js

const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('database.db');

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    age INTEGER,
    dob TEXT
)`);
module.exports = db; // Export the database object
