const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); // ✅ Add this line
require('dotenv').config(); // Load environment variables from .env

const vendorRoutes = require('./routes/vendors');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/authRoutes'); // NEW

const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
app.use(cors());

// ✅ Serve static files
app.use(express.static(path.join(__dirname, '../FrontEnd')));

app.use(express.json()); // to parse JSON bodies

// Use the routes
app.use('/vendors', vendorRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes); // NEW

// Root route
app.get('/', (req, res) => {
  res.send('🍽️ Welcome to BoroughBites API!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});