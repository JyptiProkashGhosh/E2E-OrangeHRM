# Architecture Guide - E2E OrangeHRM Tests

A comprehensive guide to understanding the project structure, design patterns, and how components interact.

## 🏗️ Project Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Test Execution                        │
│                 (npm run test_demo)                     │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┬──────────────┐
        │                         │              │
   ┌────▼────┐          ┌────────▼───┐    ┌────▼─────┐
   │ Fixtures │          │ Test Files │    │ Helpers  │
   └────┬────┘          └────────┬───┘    └────┬─────┘
        │                        │             │
        │ Dependencies           │ Uses        │ Provides
        │                        │             │
   ┌────▼────────────────────────▼─────────────▼────┐
   │          Page Object Models (POM)               │
   │  ┌──────────┐  ┌───────────┐  ┌──────────┐   │
   │  │LoginPage │  │DashboardPage│  │UserPage│   │
   │  └──────────┘  └───────────┘  └──────────┘   │
   └────┬───────────────────────────────────────────┘
        │
   ┌────▼─────────────────────────────────────────┐
   │      Playwright Browser/Page APIs            │
   │   (Locators, Navigation, Interactions)       │
   └──────────────────────────────────────────────┘
```

## 📁 Directory Structure

### `/tests` - Test Specifications

Contains all test files written in Playwright test format.

```
tests/
├── global.setup.ts              # Runs before all tests
│   └── Creates authentication state
│   └── Stores in playwright/.auth/auth.json
│
└── login-module.spec.ts         # Login functionality tests
    ├── Invalid password test
    ├── Invalid username test
    └── Invalid credentials test
```

**Naming Convention:** `[module-name].spec.ts`

**Example structure for new test:**
```
employee-module.spec.ts         # Employee management tests
dashboard-module.spec.ts        # Dashboard feature tests
recruitment-module.spec.ts      # Recruitment workflow tests
```

### `/pages` - Page Object Models

Each page/screen in the application gets its own class.

```
pages/
├── LoginPage.ts
│   ├── Elements: username, password, loginButton, errorPopup
│   └── Methods: gotoOrangeHRM(), loginOrangeHRM()
│
├── DashboardPage.ts
│   ├── Elements: dashboardTitleText
│   └── Methods: (to be extended)
│
└── UserPage.ts
    ├── Elements: userMenuButton, logoutButton
    └── Methods: logout()
```

**Page Object Structure:**
```typescript
export class LoginPage {
  readonly page: Page;
  
  // Locators (selectors for elements)
  readonly userName: Locator;
  readonly password: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByRole("textbox", { name: "Username" });
    // Initialize all locators
  }
  
  // Methods (actions on the page)
  async loginOrangeHRM(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
```

**Guidelines:**
- Keep selectors in page class, not in tests
- Use role-based selectors when possible
- One method per user action
- Document complex interactions

### `/fixtures` - Test Fixtures

Reusable setup and utilities for tests. Uses Playwright's fixture system.

```
fixtures/
├── pom-fixtures.ts              # Page Object fixtures
│   ├── loginPage
│   ├── dashboardPage
│   └── userPage
│
├── common-fixtures.ts           # Common utilities
│   └── commonUtil (encryption)
│
└── hooks-fixtures.ts            # Test hooks
    ├── gotoUrl (navigation setup)
    └── logout (teardown)
```

**Fixture Hierarchy:**
```
baseTest (@playwright/test)
    ↓
pom-fixtures (Page objects)
    ↓
common-fixtures (Utilities)
    ↓
hooks-fixtures (Setup/Teardown)
    ↓
Test file (Ready to use)
```

**Usage in tests:**
```typescript
test("My test", async ({ loginPage, commonUtil }) => {
  // loginPage and commonUtil provided automatically
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  await loginPage.loginOrangeHRM(username, "password");
});
```

### `/utils` - Utility Classes

General purpose utilities and helpers.

```
utils/
└── CommonUtil.ts
    ├── encryptData() - AES encryption
    └── decryptData() - AES decryption
```

### `/helpers` - Helper Functions

Reusable functions for common operations.

```
helpers/
├── waitHelpers.ts               # Intelligent wait strategies
│   ├── waitForElement()
│   ├── waitForTable()
│   └── waitForNavigation()
│
├── assertionHelpers.ts          # Custom assertions
│   ├── assertElementVisible()
│   ├── assertTextPresent()
│   └── assertErrorMessage()
│
└── apiHelper.ts                 # API request utilities
    ├── createEmployee()
    ├── deleteEmployee()
    └── getEmployeeData()
```

### `/constants` - Configuration & Constants

Centralized constants used across tests.

```
constants/
└── testConstants.ts
    ├── MESSAGES (error messages, alerts)
    ├── TIMEOUTS (wait durations)
    ├── URLS (endpoint paths)
    └── DATA (test data, roles)
```

**Example:**
```typescript
export const MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  SUCCESS_LOGIN: "Dashboard",
};

export const TIMEOUTS = {
  ELEMENT_VISIBLE: 5000,
  PAGE_LOAD: 10000,
};
```

### `/test_data` - Test Data Files

JSON files containing test data.

```
test_data/
└── login-modul-data.json
    ├── wrong_password
    ├── wrong_username
    └── invalid_credential_message
```

**Best Practice:** Use parameterized tests with this data.

### `/env-files` - Environment Configuration

Environment-specific settings.

```
env-files/
├── .env.demo                    # Public demo environment
│   └── BASE_URL, USER_NAME, PASSWORD, SECRET_KEY
│
├── .env.dev                     # Dev environment
│   └── BASE_URL, USER_NAME, PASSWORD, SECRET_KEY
│
└── .env.custom                  # Your custom environment
    └── Your configuration
```

### `/playwright` - Playwright Data

Stores authentication states and test artifacts.

```
playwright/
├── .auth/
│   └── auth.json               # Stored authentication (cookies, tokens)
│       └── Created by global.setup.ts
│       └── Used by tests for authenticated sessions
│
└── [browser]/
    └── Trace files, videos, screenshots
```

### `/playwright-report` - Test Reports

Generated after test runs.

```
playwright-report/
├── index.html                   # Main report
├── data.jsonl                   # Test results in JSON
└── trace/                       # Trace viewer data
```

## 🔄 Test Execution Flow

### 1️⃣ Initialization Phase

```
Test Run Start
    ↓
Load Configuration (playwright.config.ts)
    ↓
Load Environment Variables
    ├─ BASE_URL from .env file
    ├─ SECRET_KEY for decryption
    └─ USER_NAME, PASSWORD (encrypted)
    ↓
Initialize Fixtures
    ├─ Create page object instances
    ├─ Create utility instances
    └─ Ready for test use
```

### 2️⃣ Global Setup Phase

```
Run global.setup.ts
    ↓
Navigate to login page
    ↓
Decrypt credentials using SECRET_KEY
    ↓
Perform login
    ↓
Wait for dashboard
    ↓
Save authentication state
    └─ playwright/.auth/auth.json
    ↓
Authentication Ready for Authenticated Tests
```

### 3️⃣ Test Execution Phase

```
For Each Test File:
    ├─ Load storage state (from global setup)
    ├─ Create new browser context with auth
    ├─ For Each Test:
    │  ├─ Run fixture setup
    │  ├─ Execute test code
    │  ├─ Run fixture teardown
    │  └─ Collect results
    └─ Generate artifacts (screenshots, videos)
```

### 4️⃣ Reporting Phase

```
Test Run Complete
    ↓
Collect Results
    ├─ Pass/Fail status
    ├─ Execution times
    ├─ Screenshots
    ├─ Videos
    └─ Traces
    ↓
Generate Reports
    └─ HTML Report (playwright-report/)
    ↓
Display Summary
```

## 🎯 Design Patterns Used

### 1. Page Object Model (POM)

**What:** Each page/screen has a class with:
- Locators (element selectors)
- Methods (user interactions)

**Why:** 
- Separation of concerns (test logic vs. page logic)
- Easy maintenance (change selector once, all tests benefit)
- Reusable across multiple tests

**Example:**
```typescript
// BAD: Selector in test
test("Login", async ({ page }) => {
  await page.locator('[name="username"]').fill("admin");
  // If selector changes, need to update all tests
});

// GOOD: Using POM
test("Login", async ({ loginPage }) => {
  await loginPage.fillUsername("admin");
  // If selector changes, only update LoginPage
});
```

### 2. Fixture-Based Architecture

**What:** Reusable test setup using Playwright fixtures

**Why:**
- Automatic dependency injection
- Clean test code
- Easy to extend

**Pattern:**
```typescript
type MyFixtures = {
  myHelper: MyHelper;
};

export const test = baseTest.extend<MyFixtures>({
  myHelper: async ({}, use) => {
    const helper = new MyHelper();
    await helper.setup();
    await use(helper);
    await helper.teardown();
  }
});
```

### 3. Encrypted Credentials

**What:** Sensitive data is encrypted in env files

**Why:**
- Never commit plain passwords
- Safe to store in version control
- Industry best practice

**Process:**
```
Plain Password → Encrypt with SECRET_KEY → Store in .env
                                          ↓
During Test: Load .env → Decrypt with SECRET_KEY → Use in test
```

### 4. Hierarchical Fixtures

**What:** Fixtures extend other fixtures in a chain

```
Base Fixtures (Playwright default)
    ↓ Extend
Page Object Fixtures (pages)
    ↓ Extend
Common Fixtures (utilities)
    ↓ Extend
Hooks Fixtures (setup/teardown)
    ↓
Tests use all fixtures
```

**Benefit:** Modular, organized, easy to add new utilities

## 🔌 Extension Points

### Add New Page Object

1. Create new file: `pages/EmployeePage.ts`
2. Define class with locators and methods
3. Register in `fixtures/pom-fixtures.ts`
4. Use in tests

### Add New Helper

1. Create file: `helpers/customHelper.ts`
2. Export helper class/functions
3. Create fixture in `fixtures/common-fixtures.ts`
4. Use in tests

### Add New Test Suite

1. Create: `tests/employee-module.spec.ts`
2. Use existing fixtures
3. Follow existing test structure
4. Run: `npm run test_dev`

## 📊 Data Flow Example: Login Test

```
Test Starts
    ↓
Fixture provides: loginPage, commonUtil
    ↓
Test calls: loginPage.gotoOrangeHRM()
    ├─ Reads process.env.BASE_URL
    └─ Navigates to page
    ↓
Test calls: loginPage.loginOrangeHRM(username, password)
    ├─ Fills username field
    ├─ Fills password field
    └─ Clicks login button
    ↓
Test checks: expect(loginPage.invalidCredentialPopup)
    └─ Verifies error message appears
    ↓
Fixture cleanup (teardown)
    ↓
Test Complete
```

## 🚀 Configuration Files

### playwright.config.ts

Main Playwright configuration:
- Test directory
- Browsers to test
- Reporter configuration
- Timeout settings
- Screenshot/video capture

### package.json

- Dependencies (Playwright, TypeScript, etc.)
- npm scripts (test commands)
- Project metadata

### .env Files

- BASE_URL: Application URL
- USER_NAME: Encrypted username
- PASSWORD: Encrypted password
- SECRET_KEY: Encryption key

## ✅ Best Practices Implemented

✅ **Type Safety** - TypeScript for compile-time error checking
✅ **Separation of Concerns** - Page objects separate from tests
✅ **DRY Principle** - Fixtures prevent code duplication
✅ **Security** - Encrypted credentials, not in repository
✅ **Scalability** - Easy to add new tests, pages, fixtures
✅ **Maintainability** - Clear structure, easy to navigate
✅ **Reporting** - Detailed HTML reports with artifacts
✅ **CI/CD Ready** - Configuration for GitHub Actions

## 🔍 Debugging & Troubleshooting

### View Test Trace
```bash
# Generate trace
npx playwright test --trace on

# View trace
npx playwright show-trace [trace-file]
```

### Debug Mode
```bash
# Run with debugger
npx playwright test --debug

# Step through code
# Inspect selectors
# Check element state
```

### View Locator
```bash
# Highlight elements
page.locator('button').highlight();

# Count elements
const count = await page.locator('button').count();
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Fixtures Guide](https://playwright.dev/docs/test-fixtures)
- [Best Practices](https://playwright.dev/docs/best-practices)
