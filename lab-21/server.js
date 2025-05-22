const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// In-memory users array
const users = [];

// Server secret for JWT signing
const SECRET = 'your_very_secret_string_here';

// Middleware to protect routes except those starting with /account/
app.use((req, res, next) => {
  if (req.path.startsWith('/account/')) {
    return next();
  }

  const token = req.cookies.token;
  if (!token) {
    const returnUrl = encodeURIComponent(req.originalUrl);
    return res.redirect(`/account/login-page?returnUrl=${returnUrl}`);
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      const returnUrl = encodeURIComponent(req.originalUrl);
      return res.redirect(`/account/login-page?returnUrl=${returnUrl}`);
    }
    req.user = decoded; // store user info in request
    next();
  });
});

// Basic pages
app.get('/home', (req, res) => res.send('<h1>Welcome to Home Page</h1>'));
app.get('/about', (req, res) => res.send('<h1>About Us</h1><p>Some info about us.</p>'));
app.get('/contact', (req, res) => res.send('<h1>Contact Us</h1><p>Email: contact@example.com</p>'));

// Login page form
app.get('/account/login-page', (req, res) => {
  const returnUrl = req.query.returnUrl || '/home';
  res.send(`
    <h1>Login</h1>
    <form method="POST" action="/account/login?returnUrl=${encodeURIComponent(returnUrl)}">
      <label>Username: <input name="username" /></label><br/>
      <label>Password: <input type="password" name="password" /></label><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

// Sign-up page form
app.get('/account/sign-up-page', (req, res) => {
  res.send(`
    <h1>Sign Up</h1>
    <form method="POST" action="/account/sign-up">
      <label>Username: <input name="username" /></label><br/>
      <label>Password: <input type="password" name="password" /></label><br/>
      <button type="submit">Sign Up</button>
    </form>
  `);
});

// POST /account/sign-up
app.post('/account/sign-up', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User created.');
});

// POST /account/login
app.post('/account/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('Username/password did not authenticate');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send('Username/password did not authenticate');
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: false });
  const returnUrl = req.query.returnUrl || '/home';
  res.redirect(returnUrl);
});

// POST /account/logout
app.post('/account/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logged out');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});