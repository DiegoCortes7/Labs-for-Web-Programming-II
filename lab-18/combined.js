// combined.js
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const secretKey = 'mySecretKey123';

// SHA-256 Hashing
function hashData(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

// Base64
function encodeBase64(data) {
  return Buffer.from(data).toString('base64');
}
function decodeBase64(encodedData) {
  return Buffer.from(encodedData, 'base64').toString('utf-8');
}

// AES Encryption
function encryptData(data, key = secretKey) {
  return CryptoJS.AES.encrypt(data, key).toString();
}
function decryptData(encryptedData, key = secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Combined Process
function secureProcess(password) {
  const hashedPassword = hashData(password);
  console.log("Hashed:", hashedPassword);

  const encodedHash = encodeBase64(hashedPassword);
  console.log("Base64 Encoded:", encodedHash);

  const encryptedHash = encryptData(encodedHash);
  console.log("Encrypted:", encryptedHash);

  const decryptedHash = decryptData(encryptedHash);
  const decodedHash = decodeBase64(decryptedHash);
  console.log("Decrypted and Decoded:", decodedHash);
}

// Example usage
const password = process.argv[2] || "myPassword123";
secureProcess(password);