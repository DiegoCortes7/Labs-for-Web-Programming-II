// encryption.js
const CryptoJS = require('crypto-js');

const secretKey = 'mySecretKey123';

function encryptData(data, key = secretKey) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

function decryptData(encryptedData, key = secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// User input
const input = process.argv[2] || "Sensitive Data";
const encrypted = encryptData(input);
console.log("Encrypted:", encrypted);
const decrypted = decryptData(encrypted);
console.log("Decrypted:", decrypted);