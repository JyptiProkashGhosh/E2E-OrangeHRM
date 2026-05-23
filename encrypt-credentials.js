#!/usr/bin/env node

/**
 * Credential Encryption Utility
 *
 * Usage: node encrypt-credentials.js
 *
 * This script helps you encrypt credentials for use in .env files.
 * It uses the same AES encryption as the CommonUtil class.
 */

const CryptoJS = require("crypto-js");
const readline = require("readline");
require("dotenv").config({ path: "env-files/.env.demo" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get secret key from environment
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error("❌ ERROR: SECRET_KEY not found in environment!");
  console.error(
    'Please set SECRET_KEY in env-files/.env.demo or as environment variable'
  );
  console.error("\n📝 To generate a SECRET_KEY, run:");
  console.error('   node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
  process.exit(1);
}

console.log("🔐 Credential Encryption Tool");
console.log("=============================\n");
console.log(`Using SECRET_KEY: ${secretKey.substring(0, 8)}...`);
console.log("\nEnter your credentials to encrypt:\n");

rl.question("Username: ", (username) => {
  rl.question("Password: ", (password) => {
    try {
      // Encrypt data
      const encryptedUsername = CryptoJS.AES.encrypt(
        username,
        secretKey
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        secretKey
      ).toString();

      console.log("\n✅ Encryption successful!");
      console.log("\n📋 Add these to your .env file:\n");
      console.log('USER_NAME = "' + encryptedUsername + '"');
      console.log('PASSWORD = "' + encryptedPassword + '"');

      console.log("\n📋 Or use in your environment variables:\n");
      console.log("export USER_NAME=" + encryptedUsername);
      console.log("export PASSWORD=" + encryptedPassword);

      rl.close();
    } catch (error) {
      console.error("❌ Error during encryption:", error.message);
      rl.close();
      process.exit(1);
    }
  });
});
