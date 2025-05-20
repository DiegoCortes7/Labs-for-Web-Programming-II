const express = require('express');
const router = express.Router();
const data = require('../data.json');

// Home route
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    welcomeMessage: 'Welcome to the Handlebars Lab!',
    people: data.people,
    showImage: true
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('home', {
    title: 'About Us',
    welcomeMessage: 'Learn more about us!',
    people: [],
    showImage: false
  });
});

// Items list page
router.get('/items', (req, res) => {
  res.render('home', {
    title: 'Item List',
    items: data.items,
    showImage: false
  });
});

// Dynamic item by ID
router.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.items.find(i => i.id === id);

  if (item) {
    res.render('home', {
      title: `Item ${id}`,
      item,
      showImage: false
    });
  } else {
    res.status(404).render('home', {
      title: 'Item Not Found',
      errorMessage: 'Sorry, that item does not exist.',
      showImage: false
    });
  }
});

module.exports = router;