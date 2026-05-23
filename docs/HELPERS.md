# Helper Functions Reference

Complete guide to utility functions and helpers available in the framework.

## 📚 Table of Contents

1. [Wait Helpers](#wait-helpers)
2. [Assertion Helpers](#assertion-helpers)
3. [API Helpers](#api-helpers)
4. [Common Utilities](#common-utilities)

---

## Wait Helpers

Located in `helpers/waitHelpers.ts`

Helper functions for intelligent waiting instead of hard-coded delays.

### waitForElement()

Waits for an element to be visible on the page.

```typescript
// Signature
async waitForElement(locator: Locator, timeout?: number): Promise<void>

// Example
test("[Employee] Create employee", async ({ employeePage }) => {
  await employeePage.gotoEmployeePage();
  await waitForElement(employeePage.addButton, 5000);
  
  // Now safely interact with button
  await employeePage.addButton.click();
});
```

### waitForNavigation()

Waits for navigation to complete before continuing.

```typescript
// Signature
async waitForNavigation(page: Page, fn: () => Promise<void>): Promise<void>

// Example
test("[Login] User navigates to dashboard", async ({
  loginPage,
  page
}) => {
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  
  // Wait for navigation after login
  await waitForNavigation(page, async () => {
    await loginPage.loginOrangeHRM(username, "password123");
  });
  
  expect(page).toHaveURL(/dashboard/);
});
```

### waitForTable()

Waits for table data to load and be interactive.

```typescript
// Signature
async waitForTable(locator: Locator, timeout?: number): Promise<void>

// Example
test("[Employee] View employee list", async ({ employeePage }) => {
  await employeePage.gotoEmployeePage();
  
  // Wait for table to load
  await waitForTable(employeePage.employeeTable);
  
  // Table is ready
  const rowCount = await employeePage.employeeRows.count();
  expect(rowCount).toBeGreaterThan(0);
});
```

### waitForCondition()

Waits for a custom condition to be true.

```typescript
// Signature
async waitForCondition(
  condition: () => Promise<boolean>,
  timeout?: number
): Promise<void>

// Example
test("[Employee] Verify employee created", async ({
  employeePage,
  page
}) => {
  await employeePage.addNewEmployee("John", "Doe");
  
  // Wait for specific condition
  await waitForCondition(async () => {
    const message = await employeePage.successMessage.isVisible();
    return message;
  }, 5000);
  
  expect(employeePage.successMessage).toBeVisible();
});
```

### waitForText()

Waits for an element to contain specific text.

```typescript
// Signature
async waitForText(
  locator: Locator,
  text: string,
  timeout?: number
): Promise<void>

// Example
test("[Dashboard] Dashboard loads", async ({
  dashboardPage,
  page
}) => {
  await page.goto(process.env.BASE_URL!);
  
  // Wait for dashboard title to appear
  await waitForText(dashboardPage.dashboardTitle, "Dashboard", 10000);
  
  expect(dashboardPage.dashboardTitle).toContainText("Dashboard");
});
```

---

## Assertion Helpers

Located in `helpers/assertionHelpers.ts`

Custom assertion functions for common checks.

### assertElementVisible()

Asserts that an element is visible.

```typescript
// Signature
async assertElementVisible(
  locator: Locator,
  message?: string
): Promise<void>

// Example
test("[Login] Login page displays correctly", async ({
  loginPage
}) => {
  await loginPage.gotoOrangeHRM();
  
  // Assert all elements are visible
  await assertElementVisible(loginPage.userName, "Username field");
  await assertElementVisible(loginPage.password, "Password field");
  await assertElementVisible(loginPage.loginButton, "Login button");
});
```

### assertTextPresent()

Asserts that text is present in element.

```typescript
// Signature
async assertTextPresent(
  locator: Locator,
  text: string,
  message?: string
): Promise<void>

// Example
test("[Employee] Employee successfully created", async ({
  employeePage
}) => {
  await employeePage.addNewEmployee("John", "Doe");
  
  // Assert success message
  await assertTextPresent(
    employeePage.successMessage,
    "Successfully Saved",
    "Success message should appear"
  );
});
```

### assertErrorMessage()

Asserts that an error message is displayed.

```typescript
// Signature
async assertErrorMessage(
  locator: Locator,
  expectedError: string,
  message?: string
): Promise<void>

// Example
test("[Login] Invalid password shows error", async ({
  loginPage,
  commonUtil
}) => {
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  
  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(username, "wrong-password");
  
  // Assert error message
  await assertErrorMessage(
    loginPage.invalidCredentialPopup,
    "Invalid credentials",
    "Should show invalid credentials error"
  );
});
```

### assertElementDisabled()

Asserts that an element is disabled.

```typescript
// Signature
async assertElementDisabled(
  locator: Locator,
  message?: string
): Promise<void>

// Example
test("[Employee] Submit button disabled without data", async ({
  employeePage
}) => {
  await employeePage.gotoEmployeePage();
  
  // Assert button is disabled initially
  await assertElementDisabled(
    employeePage.submitButton,
    "Submit button should be disabled"
  );
});
```

### assertElementEnabled()

Asserts that an element is enabled.

```typescript
// Signature
async assertElementEnabled(
  locator: Locator,
  message?: string
): Promise<void>

// Example
test("[Employee] Submit button enabled with data", async ({
  employeePage
}) => {
  await employeePage.gotoEmployeePage();
  
  await employeePage.firstNameField.fill("John");
  await employeePage.lastNameField.fill("Doe");
  
  // Assert button is now enabled
  await assertElementEnabled(
    employeePage.submitButton,
    "Submit button should be enabled"
  );
});
```

### assertPageTitle()

Asserts the page has expected title.

```typescript
// Signature
async assertPageTitle(
  page: Page,
  expectedTitle: string,
  message?: string
): Promise<void>

// Example
test("[Dashboard] Dashboard page title", async ({
  page,
  dashboardPage
}) => {
  await page.goto(process.env.BASE_URL!);
  
  await assertPageTitle(
    page,
    "OrangeHRM",
    "Page title should be OrangeHRM"
  );
});
```

---

## API Helpers

Located in `helpers/apiHelper.ts`

Helper functions for API calls (for creating/cleaning up test data).

### createEmployee()

Creates a new employee via API.

```typescript
// Signature
async createEmployee(
  apiContext: APIRequestContext,
  employeeData: EmployeeData
): Promise<Employee>

// Example
test("[Employee] Test employee workflows", async ({
  page
}) => {
  const apiContext = await request.newContext();
  
  // Create test employee via API
  const employee = await createEmployee(apiContext, {
    firstName: "Test",
    lastName: "Employee",
    email: "test@example.com"
  });
  
  // Now test with real data
  console.log("Created employee with ID:", employee.id);
});
```

### deleteEmployee()

Deletes an employee via API.

```typescript
// Signature
async deleteEmployee(
  apiContext: APIRequestContext,
  employeeId: string
): Promise<void>

// Example
test("[Employee] Verify deleted employee", async ({
  page
}) => {
  // Delete via API
  await deleteEmployee(apiContext, "123");
  
  // Verify deletion in UI
  await employeePage.searchForEmployee("Test");
  expect(employeePage.noResultsMessage).toBeVisible();
});
```

### getEmployeeData()

Retrieves employee data via API.

```typescript
// Signature
async getEmployeeData(
  apiContext: APIRequestContext,
  employeeId: string
): Promise<Employee>

// Example
test("[Employee] Verify employee data", async ({
  page
}) => {
  const employeeData = await getEmployeeData(apiContext, "123");
  
  expect(employeeData.firstName).toBe("John");
  expect(employeeData.lastName).toBe("Doe");
});
```

---

## Common Utilities

Located in `utils/CommonUtil.ts`

### encryptData()

Encrypts sensitive data.

```typescript
// Signature
public encryptData(data: string): string

// Example
test("[Admin] Manage credentials", async ({
  commonUtil
}) => {
  const plainPassword = "admin123";
  const encryptedPassword = commonUtil.encryptData(plainPassword);
  
  console.log("Encrypted:", encryptedPassword);
  // Use encrypted value in .env files
});
```

### decryptData()

Decrypts encrypted data from environment.

```typescript
// Signature
public decryptData(encryptedData: string): string

// Example
test("[Login] Login with decrypted credentials", async ({
  loginPage,
  commonUtil
}) => {
  // Get encrypted data from environment
  const encryptedUsername = process.env.USER_NAME!;
  
  // Decrypt
  const username = commonUtil.decryptData(encryptedUsername);
  
  // Use in test
  await loginPage.loginOrangeHRM(username, "password123");
});
```

---

## Usage Examples

### Example 1: Complete Test with Helpers

```typescript
import { test, expect } from '../fixtures/hooks-fixtures';
import { waitForElement, waitForNavigation } from '../helpers/waitHelpers';
import { assertTextPresent, assertErrorMessage } from '../helpers/assertionHelpers';

test("[Employee] Create and verify employee", async ({
  employeePage,
  page,
  commonUtil
}) => {
  // Navigate to employee page
  await employeePage.gotoEmployeePage();
  
  // Wait for add button to be clickable
  await waitForElement(employeePage.addButton);
  
  // Create employee
  await employeePage.addNewEmployee("John", "Doe");
  
  // Wait for page to navigate to new employee
  await waitForNavigation(page, async () => {
    await employeePage.saveButton.click();
  });
  
  // Verify success
  await assertTextPresent(
    employeePage.successMessage,
    "Successfully Saved"
  );
});
```

### Example 2: Using Multiple Helpers

```typescript
test("[Login] Invalid login attempts", async ({
  loginPage,
  commonUtil,
  page
}) => {
  const username = commonUtil.decryptData(process.env.USER_NAME!);
  
  // Navigate to login
  await loginPage.gotoOrangeHRM();
  
  // Wait for form
  await waitForElement(loginPage.loginButton);
  
  // Try invalid password
  await loginPage.loginOrangeHRM(username, "wrong-password");
  
  // Verify error message
  await assertErrorMessage(
    loginPage.invalidCredentialPopup,
    "Invalid credentials"
  );
});
```

---

## Adding New Helpers

### Step 1: Create Helper File

```typescript
// helpers/myCustomHelper.ts
import { Locator, Page } from "@playwright/test";

export async function myCustomFunction(
  locator: Locator,
  param: string
): Promise<void> {
  // Implementation
}
```

### Step 2: Export from Index

```typescript
// helpers/index.ts
export * from './waitHelpers';
export * from './assertionHelpers';
export * from './apiHelper';
export * from './myCustomHelper';  // New export
```

### Step 3: Use in Tests

```typescript
import { myCustomFunction } from '../helpers';

test("My test", async ({ page }) => {
  await myCustomFunction(page.locator('button'), 'param');
});
```

---

## Tips & Best Practices

✅ **Use helpers** - Don't repeat common operations
✅ **Keep helpers focused** - One responsibility per helper
✅ **Document helpers** - Add JSDoc comments
✅ **Type parameters** - Use TypeScript for safety
✅ **Handle errors** - Provide meaningful error messages
✅ **Test helpers** - Verify helpers work correctly

---

## Related Documentation

- [TEST_GUIDE.md](./TEST_GUIDE.md) - Writing tests
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure
- [Playwright API](https://playwright.dev/docs/api)
