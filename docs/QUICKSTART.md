# Quick Start Guide

Get the E2E test suite running in 5 minutes!

## ⚡ 5-Minute Setup

### 1. Clone & Install (1 minute)

```bash
git clone <your-repo> E2EOrangeHRM
cd E2EOrangeHRM
npm install
npx playwright install
```

### 2. Configure Environment (2 minutes)

```bash
# Get your SECRET_KEY - generate a random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy and edit the demo env file
cp env-files/.env.demo env-files/.env.demo

# Add these values to env-files/.env.demo:
# BASE_URL = "https://opensource-demo.orangehrmlive.com"
# USER_NAME = "..." (encrypted)
# PASSWORD = "..." (encrypted)
# SECRET_KEY = "your-secret-key-here"
```

### 3. Encrypt Credentials (1 minute)

Create `encrypt-credentials.js` (or use existing if available):

```bash
node encrypt-credentials.js
# Enter your username and password when prompted
# Copy encrypted values to .env file
```

### 4. Run Tests! (1 minute)

```bash
# Run tests in headed mode (see browser)
npm run test_demo

# Or run in background
npm run test_dev

# View results
npx playwright show-report
```

## 🎯 Common Commands

```bash
# Run all tests
npm run test_dev

# Run with UI (interactive)
npm run test_demo_ui

# Run specific test file
npx playwright test tests/login-module.spec.ts

# Run with pattern matching
npx playwright test -g "Login"

# Debug mode
npx playwright test --debug

# Generate test
npx playwright codegen https://opensource-demo.orangehrmlive.com
```

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `tests/` | Test files (.spec.ts) |
| `pages/` | Page Object Models |
| `fixtures/` | Reusable test setup |
| `helpers/` | Utility functions |
| `constants/` | Test data & selectors |
| `env-files/` | Environment config |
| `playwright.config.ts` | Playwright config |
| `README.md` | Full documentation |
| `docs/SETUP.md` | Detailed setup guide |
| `docs/TEST_GUIDE.md` | How to write tests |

## 🚀 Writing Your First Test

1. **Create test file** - `tests/my-feature.spec.ts`

```typescript
import { test, expect } from '../fixtures/hooks-fixtures';

test("[Feature] Should do something", async ({
  loginPage,
  dashboardPage
}) => {
  // ARRANGE
  const username = "admin";
  
  // ACT
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, "admin123");
  
  // ASSERT
  expect(dashboardPage.dashboardTitle).toBeVisible();
});
```

2. **Run your test**

```bash
npx playwright test tests/my-feature.spec.ts
```

3. **View results**

```bash
npx playwright show-report
```

## 🔍 Troubleshooting

### "Invalid credentials" error
- ✅ Verify SECRET_KEY matches encryption key used
- ✅ Verify credentials are encrypted correctly
- ✅ Check BASE_URL is accessible

### Tests timeout
- ✅ Increase timeout in `playwright.config.ts`
- ✅ Check network connectivity
- ✅ Verify OrangeHRM instance is running

### Module not found errors
- ✅ Run `npm install`
- ✅ Run `npx playwright install`

### Permission denied
- ✅ Ensure you have read/write access to project folder
- ✅ Check file permissions

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project structure explained
- **[TEST_GUIDE.md](./TEST_GUIDE.md)** - Learn to write tests
- **[HELPERS.md](./HELPERS.md)** - Available utilities reference
- **[README.md](../README.md)** - Full project documentation

## 🤝 Next Steps

1. ✅ Complete setup (you're here!)
2. ✅ Run existing tests: `npm run test_dev`
3. ✅ Read [TEST_GUIDE.md](./TEST_GUIDE.md)
4. ✅ Write your first test
5. ✅ Check [HELPERS.md](./HELPERS.md) for utility functions
6. ✅ Explore page objects in `/pages`

## 💡 Pro Tips

- **Use `--debug` mode** to step through tests
- **Check screenshots** when tests fail in `test-results/`
- **Use helpers** like `waitForElement()` instead of hard waits
- **Keep selectors in page objects**, not tests
- **One assertion per test** (ideally)
- **Use fixtures** for common setup/teardown

## 🆘 Need Help?

1. Check the [docs/](.) folder
2. Review existing tests in `/tests`
3. See helper functions in `helpers/`
4. Check constants in `constants/`
5. Review page objects in `/pages`

## 📞 Quick Reference

```bash
# Installation
npm install
npx playwright install

# Running Tests
npm run test_demo          # Headed mode
npm run test_dev           # Headless
npm run test_demo_ui       # UI Mode

# Debugging
npx playwright test --debug
npx playwright codegen <url>

# Reports
npx playwright show-report

# Config
cat playwright.config.ts
cat env-files/.env.demo
```

---

**Ready to write tests?** Start with [TEST_GUIDE.md](./TEST_GUIDE.md) →
