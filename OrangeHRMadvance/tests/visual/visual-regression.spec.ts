import { test } from '../../src/fixtures/auth.fixture';
import { percySnapshot } from '@percy/playwright';

/**
 * Visual Regression Tests
 * These tests capture visual snapshots of key UI elements to detect unintended visual changes
 * Requires PERCY_TOKEN environment variable to be set
 * Run with: npx percy exec -- npx playwright test tests/visual/visual-regression.spec.ts
 */
test.describe('Visual Regression - UI Components @visual', () => {
  test.beforeEach(async ({ page, dashboardPage }) => {
    // Ensure we're logged in
    await page.goto('/web/index.php/dashboard/index', { waitUntil: 'networkidle' });
  });

  test('Dashboard page should match visual baseline @visual @smoke', async ({
    page,
  }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    // Capture the full page screenshot
    await percySnapshot(page, 'Dashboard - Full Page');
  });

  test('Login form should match visual baseline @visual', async ({ loginPage, page }) => {
    await loginPage.goto();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await percySnapshot(page, 'Login Form');
  });

  test('Dashboard sidebar navigation should match visual baseline @visual', async ({
    page,
  }) => {
    // Take snapshot of just the sidebar
    const sidebar = page.locator('[class*="sidebar"]').first();
    await sidebar.waitFor({ state: 'visible' });
    await percySnapshot(page, 'Dashboard Sidebar', {
      scope: sidebar,
    });
  });

  test('Admin module page should match visual baseline @visual', async ({
    adminPage,
    page,
  }) => {
    await adminPage.navigateToUserManagement();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await percySnapshot(page, 'Admin - User Management');
  });

  test('PIM employee list should match visual baseline @visual', async ({
    pimPage,
    page,
  }) => {
    await pimPage.navigateToEmployeeList();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await percySnapshot(page, 'PIM - Employee List');
  });
});
