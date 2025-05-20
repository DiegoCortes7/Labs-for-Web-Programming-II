const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth'); // ✅ Import middleware

// POST /reviews - Create a new review (🔐 Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { vendor_id, rating, comment } = req.body;
  const user_id = req.user.id; // ✅ Extract user ID from token

  try {
    const result = await pool.query(
      'INSERT INTO reviews (vendor_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [vendor_id, user_id, rating, comment]
    );
    res.status(201).json({ message: 'Review created', review: result.rows[0] });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// GET /reviews - Get all reviews (✅ Public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// GET /reviews/vendor/:vendor_id - Get reviews for a vendor (✅ Public)
router.get('/vendor/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM reviews WHERE vendor_id = $1 ORDER BY created_at DESC',
      [vendor_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching vendor reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews for vendor' });
  }
});

// DELETE /reviews/:id - Delete a review by ID (🔐 Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Optional: Only allow user to delete *their own* review
    const reviewCheck = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    const review = reviewCheck.rows[0];

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this review' });
    }

    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;