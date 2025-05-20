const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for session management
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

// Set cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'student', { maxAge: 900000, httpOnly: true });
  res.send('Cookie has been set!');
});

// Get cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Username stored in cookie: ${username}`);
});

// Delete cookie
app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie deleted');
});

// Create session
app.get('/login', (req, res) => {
  req.session.user = { username: 'student' };
  res.send('You are logged in');
});

// Access session data
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}`);
  } else {
    res.send('Please log in first');
  }
});

// Destroy session
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.clearCookie('connect.sid');
    res.send('You have logged out');
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});