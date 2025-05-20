// encoding.js
function encodeBase64(data) {
  return Buffer.from(data).toString('base64');
}

function decodeBase64(encodedData) {
  return Buffer.from(encodedData, 'base64').toString('utf-8');
}

// User input from command line
const input = process.argv[2] || "Hello, Base64!";
const encoded = encodeBase64(input);
console.log("Encoded:", encoded);
const decoded = decodeBase64(encoded);
console.log("Decoded:", decoded);