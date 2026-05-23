# Test Writing Guide - E2E OrangeHRM Tests

Learn how to write tests following best practices and project standards.

## 📝 Basic Test Structure

### Anatomy of a Test

```typescript
import { test, expect } from '../fixtures/hooks-fixtures';
import testData from '../test_data/login-modul-data.json';

// Test name should clearly describe what is being tested
test("[Feature] Description of what is being tested", async ({
  // Fixtures injected here
  loginPage,
  dashboardPage,
  commonUtil
}) => {
  // ARRANGE: Set up the test data and state
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  
  // ACT: Perform the action being tested
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, "password");
  
  // ASSERT: Verify the expected outcome
  expect(dashboardPage.dashboardTitleText).toBeVisible();
});
```

### The AAA Pattern

Every test follows **Arrange-Act-Assert**:

1. **Arrange** - Set up test data and initial state
2. **Act** - Perform the action being tested
3. **Assert** - Verify the expected result

**Good Example:**
```typescript
test("[Login] User can login with valid credentials", async ({
  loginPage,
  commonUtil,
  dashboardPage
}) => {
  // ARRANGE
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  const password = commonUtil.decryptData(process.env.PASSWORD!);
  
  // ACT
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, password);
  
  // ASSERT
  expect(dashboardPage.dashboardTitleText).toBeVisible();
});
```

## 🎯 Test Naming Conventions

### Format: `[Module] Description`

```typescript
// ✅ GOOD: Clear, describes expected behavior
test("[Login] User cannot login with invalid password", async ({}) => {});
test("[Employee] Admin can create new employee", async ({}) => {});
test("[Dashboard] Dashboard displays welcome message", async ({}) => {});

// ❌ BAD: Vague, unclear
test("test1", async ({}) => {});
test("login works", async ({}) => {});
test("do something", async ({}) => {});
```

### Module Tags

- `[Login]` - Authentication tests
- `[Dashboard]` - Dashboard functionality
- `[Employee]` - Employee management
- `[Admin]` - Administration features
- `[Report]` - Reporting features

## 🏗️ Creating New Page Objects

### Step 1: Identify the Page

Determine what page/screen needs testing.

### Step 2: Create Page Class

**File:** `pages/EmployeePage.ts`

```typescript
import { Locator, Page } from "@playwright/test";

export class EmployeePage {
  readonly page: Page;
  
  // Locators for all elements on the page
  readonly addButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Use role-based selectors when possible
    this.addButton = page.getByRole("button", { name: "Add" });
    this.firstNameField = page.getByLabel("First Name");
    this.lastNameField = page.getByLabel("Last Name");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successMessage = page.locator("//div[@class='oxd-toast-content']");
  }
  
  // Navigation method
  async gotoEmployeePage() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/pim/viewEmployeeList`);
  }
  
  // Action methods
  async addNewEmployee(firstName: string, lastName: string) {
    await this.addButton.click();
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.saveButton.click();
  }
  
  // Query methods (return data, don't modify page)
  async getSuccessMessageText(): Promise<string> {
    return await this.successMessage.textContent() || "";
  }
}
```

### Step 3: Register in Fixtures

**File:** `fixtures/pom-fixtures.ts`

```typescript
import { EmployeePage } from "../pages/EmployeePage";

type PomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeePage: EmployeePage;  // Add new page
};

export const test = baseTest.extend<PomFixtures>({
  // ... existing fixtures ...
  
  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  }
});
```

### Step 4: Use in Tests

```typescript
test("[Employee] Admin can create employee", async ({
  employeePage
}) => {
  await employeePage.gotoEmployeePage();
  await employeePage.addNewEmployee("John", "Doe");
  expect(employeePage.successMessage).toContainText("Successfully Saved");
});
```

## 🎬 Writing Different Test Types

### Positive Test (Happy Path)

Tests the expected behavior when everything works correctly.

```typescript
test("[Login] User can login with valid credentials", async ({
  loginPage,
  commonUtil,
  dashboardPage
}) => {
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  const password = commonUtil.decryptData(process.env.PASSWORD!);
  
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, password);
  
  // Verify successful login
  expect(dashboardPage.dashboardTitleText).toBeVisible();
});
```

### Negative Test (Error Handling)

Tests behavior when things go wrong.

```typescript
test("[Login] User cannot login with invalid password", async ({
  loginPage,
  commonUtil
}) => {
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, "wrong-password");
  
  // Verify error message
  expect(loginPage.invalidCredentialPopup).toContainText("Invalid credentials");
});
```

### Boundary Test

Tests edge cases and limits.

```typescript
test("[Employee] Cannot create employee with empty first name", async ({
  employeePage
}) => {
  await employeePage.gotoEmployeePage();
  await employeePage.addNewEmployee("", "Doe");
  
  expect(employeePage.firstNameRequiredError).toBeVisible();
});
```

### Data-Driven Test

Tests multiple scenarios with different data.

```typescript
const loginData = [
  { username: "admin", password: "admin123", shouldSucceed: true },
  { username: "admin", password: "wrong", shouldSucceed: false },
  { username: "invalid", password: "admin123", shouldSucceed: false },
];

for (const data of loginData) {
  test(`[Login] Login with ${data.username}`, async ({
    loginPage,
    dashboardPage
  }) => {
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(data.username, data.password);
    
    if (data.shouldSucceed) {
      expect(dashboardPage.dashboardTitleText).toBeVisible();
    } else {
      expect(loginPage.invalidCredentialPopup).toBeVisible();
    }
  });
}
```

## 📋 Assertion Examples

### Common Assertions

```typescript
// Element visibility
expect(element).toBeVisible();
expect(element).toBeHidden();

// Element state
expect(element).toBeEnabled();
expect(element).toBeDisabled();
expect(element).toBeChecked();

// Text content
expect(element).toContainText("Welcome");
expect(element).toHaveText("Exact text");

// Value (for inputs)
expect(input).toHaveValue("expected value");

// Attributes
expect(button).toHaveAttribute("disabled");

// Count
expect(locator).toHaveCount(3);

// URL
expect(page).toHaveURL("https://example.com");

// Title
expect(page).toHaveTitle("Page Title");
```

## 🔍 Best Practices for Writing Tests

### 1. Use Descriptive Names

```typescript
// ✅ GOOD
test("[Employee] Admin can create employee with all required fields", async ({}) => {});

// ❌ BAD
test("create emp", async ({}) => {});
```

### 2. One Assertion per Test (Ideally)

```typescript
// ✅ GOOD: Each test has single focus
test("[Login] Valid credentials login succeeds", async ({
  loginPage,
  dashboardPage
}) => {
  await loginPage.login("admin", "admin123");
  expect(dashboardPage.dashboardTitle).toBeVisible();
});

// ❌ BAD: Multiple unrelated assertions
test("[Login] Login flow", async ({
  loginPage,
  dashboardPage,
  employeePage
}) => {
  await loginPage.login("admin", "admin123");
  expect(dashboardPage.dashboardTitle).toBeVisible();
  await employeePage.gotoEmployeePage();
  expect(employeePage.employeeList).toBeVisible();
  // This is testing two workflows, should be split
});
```

### 3. Use Fixtures for Setup/Teardown

```typescript
// ✅ GOOD: Use fixture for cleanup
test("[Employee] Create employee", async ({
  employeePage,
  logout  // Fixture that logs out after test
}) => {
  await employeePage.addNewEmployee("John", "Doe");
  expect(employeePage.successMessage).toBeVisible();
  // Automatic logout after test
});

// ❌ BAD: Manual cleanup
test("[Employee] Create employee", async ({
  employeePage,
  userPage
}) => {
  await employeePage.addNewEmployee("John", "Doe");
  // Manual logout - easy to forget
  await userPage.logout();
});
```

### 4. Avoid Hard Waits

```typescript
// ✅ GOOD: Intelligent wait
test("[Employee] Search finds employee", async ({
  employeePage
}) => {
  await employeePage.searchForEmployee("John");
  // Wait helper knows what to wait for
  await employeePage.waitForSearchResults();
  expect(employeePage.firstResult).toContainText("John");
});

// ❌ BAD: Hard wait
test("[Employee] Search finds employee", async ({
  employeePage,
  page
}) => {
  await employeePage.searchForEmployee("John");
  await page.waitForTimeout(2000);  // Hope 2 seconds is enough
  expect(employeePage.firstResult).toContainText("John");
});
```

### 5. Keep Tests Independent

```typescript
// ✅ GOOD: Each test sets up its own state
test("[Employee] Can create employee", async ({
  employeePage,
  commonUtil
}) => {
  await employeePage.gotoEmployeePage();  // Start fresh
  await employeePage.addNewEmployee("John", "Doe");
  expect(employeePage.successMessage).toBeVisible();
});

// ❌ BAD: Dependent on other tests
test("[Employee] Can create employee", async ({
  employeePage
}) => {
  // Assumes we're already on employee page from previous test
  await employeePage.addNewEmployee("John", "Doe");
  expect(employeePage.successMessage).toBeVisible();
});
```

## 📊 Test Organization

### Group Tests by Feature

```
tests/
├── login-module.spec.ts          # All login tests
├── employee-module.spec.ts       # All employee management
├── dashboard-module.spec.ts      # All dashboard tests
└── recruitment-module.spec.ts    # All recruitment tests
```

### Create Test Data Files

```
test_data/
├── login-modul-data.json
├── employee-data.json
└── recruitment-data.json
```

### Organize Test Data

```json
{
  "valid_credentials": {
    "username": "admin",
    "password": "admin123"
  },
  "invalid_credentials": {
    "username": "wrong",
    "password": "wrong"
  },
  "messages": {
    "success": "Successfully saved",
    "error": "Invalid credentials"
  }
}
```

## 🚀 Running Tests

### Run All Tests
```bash
npm run test_dev
```

### Run Specific File
```bash
npx playwright test tests/login-module.spec.ts
```

### Run Tests with Pattern
```bash
npx playwright test -g "User cannot login"
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

### Run with Specific Browser
```bash
npx playwright test --project=chromium
```

## 🐛 Debugging Failed Tests

### 1. Check Error Message
The error message often tells you what's wrong.

### 2. View Screenshot
Tests capture screenshots on failure. Check `test-results/`

### 3. Watch Video
Videos are captured on failure: `test-results/`

### 4. Inspect Trace
```bash
npx playwright show-report
# Look at test trace for detailed execution
```

### 5. Use Debug Mode
```bash
npx playwright test tests/failing-test.spec.ts --debug
# Inspect locators, step through code
```

## ✅ Checklist Before Committing Tests

- [ ] Test has descriptive name following `[Module] Description` pattern
- [ ] Uses AAA (Arrange-Act-Assert) pattern
- [ ] No hard waits (uses page waits instead)
- [ ] Independent (doesn't depend on other tests)
- [ ] Passes locally
- [ ] Uses fixtures from fixtures/
- [ ] All locators in page objects
- [ ] Test data in test_data/ or constants/
- [ ] Comments explain WHY, not WHAT
- [ ] No `console.log()` statements left
- [ ] Screenshots/videos reviewed if test failed

## 📚 More Examples

See `/tests` directory for complete examples of different test types.

## 🎓 Learning Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Fixtures](https://playwright.dev/docs/test-fixtures)
- [Assertions](https://playwright.dev/docs/test-assertions)
