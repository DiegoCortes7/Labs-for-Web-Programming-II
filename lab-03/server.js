const express = require('express');
const path = require('path');
const app = express();

// Middleware to log requests 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set port (default 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
