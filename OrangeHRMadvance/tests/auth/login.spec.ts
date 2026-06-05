import { test, expect } from '../../fixtures/auth.fixture';
import { TestData } from '../../utils/test-data';

test.describe('Login Functionality - Negative & Positive', () => {
  // Override storageState for this block so we start completely clean (unauthenticated)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Should login successfully with valid credentials @smoke', async ({ loginPage, page }) => {
    await loginPage.login(TestData.auth.adminUsername, TestData.auth.adminPassword);
    
    // Validate redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard.*/);
    const dashboardHeader = page.locator('.oxd-topbar-header-title h6');
    await expect(dashboardHeader).toHaveText('Dashboard');
  });

  // Parameterized negative testing for invalid credentials
  const invalidCredentials = [
    {
      username: TestData.auth.invalidUsername,
      password: TestData.auth.adminPassword,
      description: 'invalid username and valid password',
    },
    {
      username: TestData.auth.adminUsername,
      password: TestData.auth.invalidPassword,
      description: 'valid username and invalid password',
    },
    {
      username: TestData.auth.invalidUsername,
      password: TestData.auth.invalidPassword,
      description: 'invalid username and invalid password',
    },
  ];

  for (const scenario of invalidCredentials) {
    test(`Should display invalid credentials message for ${scenario.description}`, async ({ loginPage }) => {
      await loginPage.login(scenario.username, scenario.password);
      await loginPage.expectInvalidCredentialsMessage();
    });
  }

  test('Should display validation error messages when fields are left blank', async ({ loginPage }) => {
    // Submit with empty inputs
    await loginPage.login('', '');
    await loginPage.expectRequiredMessageCount(2);
  });
});
