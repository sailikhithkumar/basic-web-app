// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, age, dob } = req.body;

  // Insert data into database
  db.run(
    'INSERT INTO users (name, email, age, dob) VALUES (?, ?, ?, ?)',
    [name, email, age, dob],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Data submitted successfully');
      }
    }
  );
});

// Endpoint to retrieve user data
app.get('/users', (req, res) => {
  // Retrieve data from database
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
