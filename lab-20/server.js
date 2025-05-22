const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Replace this with your actual secret
const SECRET_KEY = 'secret-message';

// Route to verify the token
app.post('/verify', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    res.json({ valid: true, payload });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});