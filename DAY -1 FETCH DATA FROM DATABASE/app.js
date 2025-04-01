const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Root URL पर index.html भेजो
});



// API to fetch data
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users where name = "shrikant" ', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on: \x1b[34mhttp://localhost:${port}\x1b[0m`);
});
