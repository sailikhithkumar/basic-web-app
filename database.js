const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('database.db');

// Function to recreate the users table
function recreateUsersTable() {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS users`);
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        age INTEGER,
        dob TEXT
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created successfully');
        }
      }
    );
  });
}

// Initially create or recreate the users table
recreateUsersTable();

module.exports = db;
