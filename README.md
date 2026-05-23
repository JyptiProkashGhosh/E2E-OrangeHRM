
# E2E OrangeHRM Test Suite

A comprehensive **End-to-End (E2E)** test automation framework for **OrangeHRM** using **Playwright** and **TypeScript**.

## 📋 Overview

This project implements automated testing for OrangeHRM using industry best practices:

- ✅ **Page Object Model (POM)** - Maintainable and scalable test structure
- ✅ **Playwright Test Framework** - Fast, reliable, and modern browser automation
- ✅ **TypeScript** - Type safety and better IDE support
- ✅ **Fixture-based Architecture** - Reusable test utilities and setup
- ✅ **Environment Management** - Support for multiple environments (demo, dev)
- ✅ **Encrypted Credentials** - Secure storage of sensitive test data
- ✅ **CI/CD Ready** - GitHub Actions integration for automated testing
- ✅ **Comprehensive Reporting** - HTML reports with screenshots and videos

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd E2EOrangeHRM

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Configuration

1. **Set up environment variables:**

```bash
# Copy env template
cp env-files/.env.demo env-files/.env.custom

# Edit the env file with your values
# Update SECRET_KEY for encryption/decryption
```

See [SETUP.md](./docs/SETUP.md) for detailed setup instructions.

## 📖 Documentation

- **[SETUP.md](./docs/SETUP.md)** - Installation and environment setup guide
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project structure and design patterns
- **[TEST_GUIDE.md](./docs/TEST_GUIDE.md)** - How to write and run tests
- **[HELPERS.md](./docs/HELPERS.md)** - Available utility functions and helpers

## 🧪 Running Tests

### Run all tests

```bash
# Run on demo environment (headed mode)
npm run test_demo

# Run on demo environment (UI mode with interactive runner)
npm run test_demo_ui

# Run on dev environment (headless mode)
npm run test_dev
```

### Run specific test file

```bash
npx playwright test tests/login-module.spec.ts
```

### Run with specific browser

```bash
npx playwright test --project=chromium
```

### Run in debug mode

```bash
npx playwright test --debug
```

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:
- Test execution timeline
- Pass/fail status
- Screenshots on failure
- Video recordings
- Trace files for debugging

## 📁 Project Structure

```
E2EOrangeHRM/
├── tests/                    # Test specs
│   ├── global.setup.ts      # Global authentication setup
│   └── login-module.spec.ts # Login tests
├── pages/                    # Page Object Models
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── UserPage.ts
├── fixtures/                 # Reusable test fixtures
│   ├── hooks-fixtures.ts
│   ├── common-fixtures.ts
│   └── pom-fixtures.ts
├── utils/                    # Utility functions
│   └── CommonUtil.ts        # Encryption/decryption utilities
├── helpers/                  # Helper utilities
│   ├── waitHelpers.ts       # Wait strategies
│   ├── assertionHelpers.ts  # Custom assertions
│   └── apiHelper.ts         # API request helpers
├── constants/                # Constants and configurations
│   └── testConstants.ts     # Selectors, messages, URLs
├── test_data/                # Test data files
│   └── login-modul-data.json
├── env-files/                # Environment configurations
│   ├── .env.demo
│   └── .env.dev
├── playwright-report/        # Generated test reports
├── docs/                     # Documentation
│   ├── SETUP.md
│   ├── ARCHITECTURE.md
│   ├── TEST_GUIDE.md
│   └── HELPERS.md
├── .github/workflows/        # CI/CD pipelines
├── playwright.config.ts      # Playwright configuration
├── package.json              # Dependencies
└── .gitignore               # Git ignore rules
```

## 🔐 Security

- **Encrypted Credentials** - Sensitive data is encrypted with AES encryption
- **Environment Variables** - Never commit credentials to repository
- **Secret Key** - Required `SECRET_KEY` environment variable for decryption

## 🤖 CI/CD Integration

Tests run automatically on GitHub Actions:

```yaml
# Triggered on: Push, Pull Request
# Runs on: Latest Chrome, Firefox, WebKit
# Reports: HTML, JUnit XML for CI/CD systems
```

See [.github/workflows/e2e-tests.yml](./.github/workflows/e2e-tests.yml)

## 📚 Best Practices

1. **Use Page Object Model** - Keep selectors in page classes
2. **Descriptive Test Names** - Clear names indicate what is being tested
3. **Avoid Hard Waits** - Use intelligent waits (see [waitHelpers](./helpers/waitHelpers.ts))
4. **Single Responsibility** - Each test should test one scenario
5. **Data-Driven Tests** - Use test data files for different scenarios
6. **Reuse Fixtures** - Utilize fixtures for common setup/teardown

## 🛠️ Contributing

1. Create a new branch for your feature: `git checkout -b feature/my-feature`
2. Write tests following existing patterns
3. Run tests locally: `npm run test_dev`
4. Commit with clear messages: `git commit -m "Add login tests for SSO"`
5. Push and create a Pull Request

## 🐛 Troubleshooting

### Tests fail with "Invalid credentials"
- Verify `SECRET_KEY` is set correctly
- Check environment file values are encrypted
- Ensure OrangeHRM instance is running

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify page elements are loaded (use wait helpers)

### Screenshots/Videos not captured
- Enable in `playwright.config.ts` (already enabled for failures)
- Check disk space availability

## 📞 Support

- Review [documentation](./docs/)
- Check [Playwright docs](https://playwright.dev/)
- Report issues with detailed logs and screenshots

## 📄 License

ISC

## 👥 Author

QA Automation Team
"# E2E-OrangeHRM" 
