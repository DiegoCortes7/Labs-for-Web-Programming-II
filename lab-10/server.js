const express = require('express');
const fs = require('fs');
const path = require('path'); // Required to work with file paths
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

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

// POST route to add a new candidate and save to file
app.post('/candidates', (req, res) => {
  const newCandidate = req.body;

  // Validate required fields
  if (!newCandidate.name || !newCandidate.party || !newCandidate.platform) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Add to memory
  candidates.push(newCandidate);

  // Save updated list to candidates.json
  fs.writeFileSync(
    path.join(__dirname, 'candidates.json'),
    JSON.stringify(candidates, null, 2), // Pretty formatting
    'utf8'
  );

  // Respond with success
  res.status(201).json({
    message: 'Candidate added successfully and saved',
    candidate: newCandidate
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});