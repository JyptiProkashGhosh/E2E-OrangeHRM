import { test, expect } from '../../src/fixtures/auth.fixture';

test.describe('Dashboard - Smoke Suite', () => {
  test.describe('Sidebar Navigation', () => {
    test.beforeEach(async ({ dashboardPage }) => {
      // Navigate to dashboard using the cached global storage state
      await dashboardPage.navigate('/web/index.php/dashboard/index');
    });

    test('Should verify core sidebar navigation modules @smoke @dashboard', async ({ dashboardPage }) => {
      // Verify default view is Dashboard
      await dashboardPage.expectHeaderTitle('Dashboard');

      // Navigate to PIM module and verify header
      await dashboardPage.clickPIM();
      await dashboardPage.expectHeaderTitle('PIM');

      // Navigate to Admin module and verify header
      await dashboardPage.clickAdmin();
      await dashboardPage.expectHeaderTitle('Admin');
    });
  });

  test.describe('User Session Teardown', () => {
    // Override storageState for this block so we start completely clean (unauthenticated)
    // This prevents logging out from invalidating the shared session cookie on the server for concurrent tests
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Should perform user logout successfully @smoke @dashboard', async ({ loginPage, dashboardPage, page }) => {
      // Perform manual login first
      await loginPage.goto();
      await loginPage.login('Admin', 'admin123');

      // Verify default header
      await dashboardPage.expectHeaderTitle('Dashboard');

      // Trigger logout
      await dashboardPage.logout();

      // Assert redirection back to Login page
      await expect(page).toHaveURL(/.*login.*/);
    });
  });
});
