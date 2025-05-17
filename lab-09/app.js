const express = require('express');
const app = express();

app.use(express.json());

const fortunes = [
  "You will have a great day!",
  "If you don't have time to do it right the first time, what makes you think you'll have time to redo it?",
  "A surprise is waiting for you around the corner.",
  "You cannot act on what you haven't imagined.",
  "Good fortune is coming your way.",
  "Practice does not make perfect. Perfect practice makes perfect.",
  "Your hard work will soon pay off.",
  "Don't comment bad code, rewrite it.",
  "You can have anything you want, but not everything you want.",
  "The best time to plant a tree is 20 years ago. The second best time is now.",
  "When life gives you lemons, you can only make lemonade if life also gives you a lot of sugar.",
  "An exciting opportunity lies ahead.",
  "When you die and your life flashes before your eyes, you are going to have to sit through several ads",
  "The wish is the father of the thought",
  "Loneliness isn't the absence of people but the absence of meaning"
];

// GET /fortunes route with query string param "count"
app.get('/fortunes', (req, res) => {
  const count = parseInt(req.query.count) || 1;
  let selectedFortunes = [];

  for(let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * fortunes.length);
    selectedFortunes.push(fortunes[index]);
  }

  res.json(selectedFortunes);
});

// POST /submit route to accept JSON body {name, message}
app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  res.json({ success: true, response: `Thanks, ${name}! Your message was: "${message}"` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});