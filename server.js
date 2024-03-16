const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path'); // Import the path module

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Route to serve the users.html file
app.get('/users.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.post('/submit', (req, res) => {
  const { name, email, age, dob } = req.body;

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

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

app.delete('/users', (req, res) => {
  db.run('DELETE FROM users', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('All users cleared successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
