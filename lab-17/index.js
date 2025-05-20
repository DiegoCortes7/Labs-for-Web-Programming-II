const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const { Pool } = require('pg');

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lab16', // ✅ Correct database name
  password: 'Dc274685189!',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Test route
app.get('/hello', (req, res) => {
  res.send('👋 Hello from Lab 17 Express + PostgreSQL!');
});

// POST /patients → Insert new row into lab_table
app.post('/patients', async (req, res) => {
  const { name, value } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO lab_table (name, value) VALUES ($1, $2) RETURNING *',
      [name, value]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting patient');
  }
});

// GET /patients → Get all rows from lab_table
app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lab_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// PUT /patients/:id → Update a row in lab_table
app.put('/patients/:id', async (req, res) => {
  const id = req.params.id;
  const { name, value } = req.body;
  try {
    const result = await pool.query(
      'UPDATE lab_table SET name = $1, value = $2 WHERE id = $3 RETURNING *',
      [name, value, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// DELETE /patients/:id → Delete a row from lab_table
app.delete('/patients/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM lab_table WHERE id = $1', [id]);
    res.send(`Patient with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});