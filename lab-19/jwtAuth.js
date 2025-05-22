// jwtAuth.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const SECRET_KEY = 'yourSecretKey'; // replace with env var in production

// Dummy user database
const users = [
  { id: 1, username: 'admin', password: 'password123' },
  { id: 2, username: 'guest', password: 'guestpass' }
];

// Login route (POST)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = decoded;
    next();
  });
}

// Protected route
router.get('/jwt-protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you accessed a JWT protected route!` });
});

module.exports = router;