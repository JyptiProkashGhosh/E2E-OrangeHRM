import { test, expect } from '../../src/fixtures/auth.fixture';
import { logger } from '../../src/utils/logger';

test.describe('OrangeHRM Smoke Verification Suite', () => {
  test('Verify home login page health status check @smoke', async ({ pageFactory }) => {
    const loginPage = pageFactory.getLoginPage();
    await loginPage.navigateToLogin();
    const visible = await loginPage.isLoginButtonVisible();
    expect(visible).toBe(true);
  });
});
