const express = require('express');
const path = require('path');
const app = express();
const pageRoutes = require('./routes/pageRoutes');

// Set Handlebars as the templating engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use your custom routes
app.use('/', pageRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});