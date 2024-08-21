import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import bodyParser from "body-parser";
// import cors from 'cors';

const { Pool } = pg;
const app = express();
// app.use(cors({origin: 'http://localhost:5173'}));

// const pool = new Pool({
//     user: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     host: 'localhost',
//     port: 5432,
//     database: 'final'
// })

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

pool.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Connection error', err.stack));

const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/api/decibel', (req, res) => {
    pool.query('SELECT * FROM decibel', (err, results) => {
        if (!err) {
            res.send(results.rows);
        }
    });
});

app.post('/api/record_decibel', (req, res) => {
    const {decibel_value} = req.body
    if (decibel_value === undefined) {
        return res.status(400).send('Decibel value is required');
    }

    const now = new Date();
    const formattedTime = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    pool.query('INSERT INTO decibel (decibel_value, time) VALUES ($1, $2)', [decibel_value, formattedTime], (err) => {
        if (!err) {
            res.send('Successfully recorded decibel value');
        } else {
            res.status(500).send(err.message);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});