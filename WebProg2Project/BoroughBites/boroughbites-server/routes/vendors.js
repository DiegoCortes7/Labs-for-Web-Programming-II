const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth'); // import the auth middleware

// GET /vendors - fetch all vendors (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, cuisine_type AS cuisine, borough, location, contact_info FROM vendors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching vendors:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /vendors/:id - fetch vendor by ID (public)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, name, cuisine_type AS cuisine, borough, location, contact_info FROM vendors WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching vendor by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /vendors - add a new vendor (protected)
router.post('/', authenticateToken, async (req, res) => {
  const { name, cuisine, borough, location, contact_info } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO vendors (name, cuisine_type, borough, location, contact_info) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, cuisine, borough, location, contact_info]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding vendor:', err);
    res.status(500).json({ error: 'Failed to add vendor' });
  }
});

// PUT /vendors/:id - update a vendor (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, cuisine, borough, location, contact_info } = req.body;
  try {
    const result = await pool.query(
      `UPDATE vendors SET 
        name = $1, 
        cuisine_type = $2, 
        borough = $3, 
        location = $4, 
        contact_info = $5 
       WHERE id = $6 
       RETURNING *`,
      [name, cuisine, borough, location, contact_info, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating vendor:', err);
    res.status(500).json({ error: 'Failed to update vendor' });
  }
});

// DELETE /vendors/:id - delete a vendor (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM vendors WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully', vendor: result.rows[0] });
  } catch (err) {
    console.error('Error deleting vendor:', err);
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

module.exports = router;