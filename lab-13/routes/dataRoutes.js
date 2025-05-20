const express = require('express');
const router = express.Router();
const data = require('../data.json');

// 5. Regex route allowing only alphanumeric IDs
router.get('/regex/:id', (req, res) => {
  const id = req.params.id;
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// 3. Get details of specific item (subroute)
router.get('/:id/details', (req, res) => {
  const id = req.params.id;
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json({ id: item.id, name: item.name, details: item.details });
  } else {
    res.status(404).json({ error: "Details not found" });
  }
});

// 2. Get item by ID (dynamic param)
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// 4. Wildcard for unmatched routes — must be LAST
router.get('*', (req, res) => {
  res.status(404).json({ error: "Wildcard: No matching route" });
});

module.exports = router;