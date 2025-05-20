const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config(); // Load .env variables

const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecretkey';

// POST /register - Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Fix: use actual column name in DB, e.g., 'password' NOT 'password_hash'
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /login - Log in a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('🔐 Attempting login for:', username); // Debug log

  try {
    // Keep aliasing password as password_hash here for consistent code
    const result = await pool.query(
      'SELECT id, username, password AS password_hash FROM users WHERE username = $1',
      [username]
    );
    if (result.rows.length === 0) {
      console.log('❌ User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];
    console.log('✅ User found:', user);

    const validPassword = await bcrypt.compare(password, user.password_hash);
    console.log('🔍 Password valid:', validPassword);

    if (!validPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('🎫 JWT generated:', token);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('💥 Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /protected - Protected route that requires a valid JWT
router.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});
module.exports = router;
