const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

app.get('/', (req, res) => {
  res.send('Hello, HTTPS world! 🔐');
});

https.createServer(options, app).listen(8443, () => {
  console.log('HTTPS server running on https://localhost:8443');
});