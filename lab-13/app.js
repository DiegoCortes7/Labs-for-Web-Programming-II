const express = require('express');
const app = express();
const path = require('path');
const dataRoutes = require('./routes/dataRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve images statically under /images URL
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use dataRoutes for /data path
app.use('/data', dataRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});