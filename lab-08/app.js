import express from 'express';
import multer from 'multer';
import path from 'path';
import asciify from 'asciify-image';
import fs from 'fs';
import stripAnsi from 'strip-ansi';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files (like CSS or index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Home route with upload form
app.get('/', (req, res) => {
  res.send(`
    <h1>Upload an Image</h1>
    <form action="/ascii" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required>
      <button type="submit">Convert to ASCII</button>
    </form>
  `);
});

// ASCII conversion route
app.post('/ascii', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const options = { fit: 'box', width: 50, height: 50 };

  try {
    const asciiArt = await asciify(filePath, options);
    const output = stripAnsi(asciiArt);
    await fs.promises.unlink(filePath); // Clean up uploaded file
    res.send(`<pre>${output}</pre><br><a href="/">Upload another</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing image.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});