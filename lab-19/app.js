// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import route files
const basicAuthRoutes = require('./basicAuth');
const jwtAuthRoutes = require('./jwtAuth');
const protectedRoutes = require('./protectedRoutes'); // ✅ this line

// Mount routes
app.use('/basic', basicAuthRoutes);       // ex: http://localhost:3000/basic
app.use('/jwt', jwtAuthRoutes);           // ex: http://localhost:3000/jwt
app.use('/protected', protectedRoutes);   // ✅ ex: http://localhost:3000/protected

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
