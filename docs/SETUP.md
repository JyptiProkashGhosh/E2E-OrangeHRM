# Setup Guide - E2E OrangeHRM Tests

This guide walks you through setting up the E2E test environment for OrangeHRM automation.

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: v16 or higher
  ```bash
  node --version  # Check version
  ```
- **npm**: v8 or higher
  ```bash
  npm --version   # Check version
  ```
- **Git**: For cloning the repository
- **One of these Operating Systems**:
  - Windows 10/11
  - macOS 10.15+
  - Ubuntu 20.04+

## Step 1: Clone Repository

```bash
# Clone the project
git clone <your-repository-url> E2EOrangeHRM
cd E2EOrangeHRM
```

## Step 2: Install Dependencies

```bash
# Install npm packages (includes Playwright)
npm install

# Install Playwright browsers (chromium, firefox, webkit)
npx playwright install

# Install system dependencies (Linux/Mac only)
# For macOS
npx playwright install-deps

# For Ubuntu/Debian
npx playwright install-deps
```

**Troubleshooting Installation:**

```bash
# If installation fails, try clearing cache
npm cache clean --force

# Reinstall from scratch
rm -rf node_modules package-lock.json
npm install

# Install specific browser
npx playwright install chromium
```

## Step 3: Environment Configuration

### 3.1 Create Environment Files

OrangeHRM supports multiple environments. Create env files for each:

```bash
# Environment file for demo (public testing instance)
cp env-files/.env.demo env-files/.env.demo

# Environment file for dev (your dev instance)
cp env-files/.env.dev env-files/.env.dev

# Optional: Create custom environment
cp env-files/.env.demo env-files/.env.custom
```

### 3.2 Get SECRET_KEY for Encryption

The framework uses AES encryption to secure credentials. You need a secret key:

```bash
# Generate a secret key (any random string, recommend 32+ characters)
# Using Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using command line:
# On macOS/Linux:
openssl rand -hex 32

# On Windows (PowerShell):
# [System.Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Save this SECRET_KEY** - you'll need it to run tests.

### 3.3 Configure Environment Variables

Edit the environment files:

**env-files/.env.demo:**
```ini
BASE_URL = "https://opensource-demo.orangehrmlive.com"
USER_NAME = "U2FsdGVkX19Te3xknF+x4nBs2bbp1w3c5r9BGvlso1U="  # Encrypted username
PASSWORD = "U2FsdGVkX1+iLKXH7niR4YUf1nFypsy4U7kLbTSNTQo="  # Encrypted password
SECRET_KEY = "your-secret-key-here"  # Your 32+ character secret key
```

### 3.4 Encrypt Your Credentials

To create encrypted credentials, use the utility script:

```bash
# Create encrypt-credentials.js in your project root
node encrypt-credentials.js

# Enter your username and password when prompted
# It will output the encrypted values to use in .env files
```

**encrypt-credentials.js:**
```javascript
const CryptoJS = require('crypto-js');
const readline = require('readline');
require('dotenv').config({ path: 'env-files/.env.demo' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error('ERROR: SECRET_KEY not found in .env file');
  process.exit(1);
}

rl.question('Enter username: ', (username) => {
  rl.question('Enter password: ', (password) => {
    const encryptedUsername = CryptoJS.AES.encrypt(username, secretKey).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    console.log('\n=== Encrypted Credentials ===');
    console.log('USER_NAME = "' + encryptedUsername + '"');
    console.log('PASSWORD = "' + encryptedPassword + '"');
    
    rl.close();
  });
});
```

**Usage:**
```bash
# Make sure SECRET_KEY is set in env file first
node encrypt-credentials.js
# Copy the output into your .env files
```

## Step 4: Set Environment Variables

### For Running Tests Locally

```bash
# On macOS/Linux (bash)
export SECRET_KEY="your-secret-key-here"
export ENV_NAME="demo"

# On Windows (Command Prompt)
set SECRET_KEY=your-secret-key-here
set ENV_NAME=demo

# On Windows (PowerShell)
$env:SECRET_KEY="your-secret-key-here"
$env:ENV_NAME="demo"
```

### For Running Tests via npm scripts

Environment is set automatically via the npm scripts in `package.json`:

```json
{
  "scripts": {
    "test_demo": "cross-env ENV_NAME=demo npx playwright test --headed",
    "test_dev": "cross-env ENV_NAME=dev npx playwright test"
  }
}
```

**Note:** `cross-env` ensures compatibility across Windows, macOS, and Linux.

## Step 5: Verify Installation

Run the verification script to ensure everything is configured:

```bash
# Run a simple test to verify setup
npx playwright test --headed --project=chromium tests/login-module.spec.ts

# Expected output:
# ✓ [login] User cannot login with invalid password
# ✓ [login] User cannot login with invalid username
```

## Step 6: Run Tests

### First Time Setup Tests

```bash
# Run global setup (creates authentication state)
npx playwright test global.setup.ts

# Verify auth.json was created
ls -la playwright/.auth/auth.json
```

### Run Full Test Suite

```bash
# Run all tests in headed mode (see browser)
npm run test_demo

# Run all tests in headless mode (background)
npm run test_dev

# Run with interactive UI
npm run test_demo_ui
```

### Run Specific Tests

```bash
# Run login tests only
npx playwright test login-module.spec.ts

# Run specific test by name
npx playwright test -g "User cannot login with invalid password"

# Run with debug mode
npx playwright test --debug
```

## Step 7: View Test Reports

After tests run, view the detailed HTML report:

```bash
# Show latest report
npx playwright show-report

# Reports location
ls -la playwright-report/
```

**Report includes:**
- ✅/❌ Test status
- ⏱️ Execution time
- 📸 Screenshots (on failure)
- 🎥 Videos (on failure)
- 🔍 Trace files for debugging

## Troubleshooting

### Issue: "Command not found: npm"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "ENOENT: no such file or directory, open '.env.demo'"
**Solution:** Create env files in `env-files/` directory:
```bash
mkdir -p env-files
touch env-files/.env.demo
```

### Issue: "Invalid credentials" error in tests
**Solution:** 
- Verify SECRET_KEY is correct
- Verify credentials are encrypted with same SECRET_KEY
- Check BASE_URL is accessible

### Issue: Playwright browsers not found
**Solution:**
```bash
# Reinstall browsers
npx playwright install chromium

# Or all browsers
npx playwright install
```

### Issue: "Cannot find module '@playwright/test'"
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Tests timeout on CI/CD
**Solution:** Increase timeout in `playwright.config.ts`:
```typescript
timeout: 30 * 1000,  // 30 seconds per test
```

## Next Steps

1. ✅ Review [ARCHITECTURE.md](./ARCHITECTURE.md) to understand project structure
2. ✅ Read [TEST_GUIDE.md](./TEST_GUIDE.md) to learn how to write tests
3. ✅ Check [HELPERS.md](./HELPERS.md) for available utilities
4. ✅ Start writing your first test!

## Environment-Specific Configuration

### Demo Environment (Recommended for Learning)
- **URL:** https://opensource-demo.orangehrmlive.com
- **Username:** Admin (encrypted)
- **Password:** admin123 (encrypted)
- **Use Case:** Testing, learning, public access

### Dev Environment (Your Private Instance)
- **URL:** http://your-dev-server:8080
- **Username:** Your dev credentials
- **Password:** Your dev credentials
- **Use Case:** Internal testing, continuous integration

### Adding New Environment

1. Create new env file:
```bash
touch env-files/.env.staging
```

2. Add configuration:
```ini
BASE_URL = "https://staging-orangehrm.company.com"
USER_NAME = "encrypted-username"
PASSWORD = "encrypted-password"
SECRET_KEY = "your-secret-key"
```

3. Run tests for that environment:
```bash
cross-env ENV_NAME=staging npx playwright test
```

## Additional Resources

- 📖 [Playwright Documentation](https://playwright.dev)
- 📖 [OrangeHRM Documentation](https://www.orangehrm.com/)
- 🔧 [Node.js Documentation](https://nodejs.org/docs/)
- 💬 [Playwright Community](https://playwright.dev/python/docs/community)
