const express = require('express');
const fs = require('fs');
const path = require('path'); // Required to work with file paths
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

// Load candidate data from JSON file
let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Fictitious Political Candidates Server');
});

// Search route using query string parameters
app.get('/search', (req, res) => {
  const { party, platform } = req.query;
  let filteredCandidates = candidates;

  if (party) {
    filteredCandidates = filteredCandidates.filter(c => c.party === party);
  }

  if (platform) {
    filteredCandidates = filteredCandidates.filter(c =>
      c.platform.includes(platform)
    );
  }

  if (filteredCandidates.length > 0) {
    res.json(filteredCandidates);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// POST route to add a new candidate via JSON API
app.post('/candidates', (req, res) => {
  const newCandidate = req.body;

  if (!newCandidate.name || !newCandidate.party || !newCandidate.platform) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  candidates.push(newCandidate);

  fs.writeFileSync(
    path.join(__dirname, 'candidates.json'),
    JSON.stringify(candidates, null, 2),
    'utf8'
  );

  res.status(201).json({
    message: 'Candidate added successfully and saved',
    candidate: newCandidate
  });
});

// Serve the HTML form to add a new candidate
app.get('/add-candidate', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Add New Candidate</title>
    </head>
    <body>
      <h1>Add a New Political Candidate</h1>
      <form action="/add-candidate" method="POST">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br>

        <label for="party">Party:</label><br>
        <input type="text" id="party" name="party" required><br>

        <label for="platform">Platform:</label><br>
        <input type="text" id="platform" name="platform" required><br>

        <label for="slogan">Slogan:</label><br>
        <input type="text" id="slogan" name="slogan" required><br><br>

        <input type="submit" value="Submit">
      </form>
    </body>
    </html>
  `);
});

// Handle form submission from /add-candidate
app.post('/add-candidate', (req, res) => {
  const { name, party, platform, slogan } = req.body;

  if (!name || !party || !platform || !slogan) {
    return res.status(400).send('All fields are required!');
  }

  const newCandidate = { name, party, platform, slogan };

  candidates.push(newCandidate);

  fs.writeFileSync(
    path.join(__dirname, 'candidates.json'),
    JSON.stringify(candidates, null, 2),
    'utf8'
  );

  res.redirect('/candidates');
});

// Route to display all candidates (optional but useful)
app.get('/candidates', (req, res) => {
  let candidateHTML = `
    <html>
    <head><title>All Candidates</title></head>
    <body>
      <h1>List of Candidates</h1>
      <ul>
  `;

  candidates.forEach(c => {
    candidateHTML += `<li><strong>${c.name}</strong> (${c.party}) - ${c.platform} - Slogan: ${c.slogan}</li>`;
  });

  candidateHTML += `
      </ul>
      <a href="/add-candidate">Add Another Candidate</a>
    </body>
    </html>
  `;

  res.send(candidateHTML);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});