import express from 'express';
import pg from 'pg';

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.get('/api/data', (req, res) => {
    // Handle your API logic here
    res.json({ message: 'Hello from Express!' });
});

app.use(express.json());

const pool = new pg.Pool({
    // Your PostgreSQL configuration
});

app.post('/api/decibel', (req, res) => {
    const { decibel } = req.body;

    pool.query('INSERT INTO decibel_table (decibel) VALUES ($1)', [decibel])
        .then(() => res.json({ message: 'Decibel value inserted successfully.' }))
        .catch(error => res.status(500).json({ error: error.toString() }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});