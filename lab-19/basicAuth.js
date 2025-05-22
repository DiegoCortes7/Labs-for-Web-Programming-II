const express = require('express');
const router = express.Router();
const basicAuth = require('basic-auth');

// Hardcoded credentials
const USERS = {
  admin: "password123",
  user: "password456",
  guest: "guestpass", // Added a new user for the exercise
};

// Middleware to handle basic auth
function basicAuthMiddleware(req, res, next) {
  const user = basicAuth(req);

  if (user && USERS[user.name] === user.pass) {
    req.user = user.name;
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    res.status(401).send('Unauthorized');
  }
}

// Use the router, not app
router.get('/basic-protected', basicAuthMiddleware, (req, res) => {
  res.send(`Hello, ${req.user}. You have accessed a protected route.`);
});

module.exports = router;