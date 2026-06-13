# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual\visual-regression.spec.ts >> Visual Regression - UI Components @visual >> PIM employee list should match visual baseline @visual
- Location: tests\visual\visual-regression.spec.ts:55:7

# Error details

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", waiting until "networkidle"

```

# Test source

```ts
  1  | import { test } from '../../src/fixtures/auth.fixture';
  2  | import { percySnapshot } from '@percy/playwright';
  3  | 
  4  | /**
  5  |  * Visual Regression Tests
  6  |  * These tests capture visual snapshots of key UI elements to detect unintended visual changes
  7  |  * Requires PERCY_TOKEN environment variable to be set
  8  |  * Run with: npx percy exec -- npx playwright test tests/visual/visual-regression.spec.ts
  9  |  */
  10 | test.describe('Visual Regression - UI Components @visual', () => {
  11 |   test.beforeEach(async ({ page, dashboardPage }) => {
  12 |     // Ensure we're logged in
> 13 |     await page.goto('/web/index.php/dashboard/index', { waitUntil: 'networkidle' });
     |                ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  14 |   });
  15 | 
  16 |   test('Dashboard page should match visual baseline @visual @smoke', async ({
  17 |     page,
  18 |   }) => {
  19 |     // Wait for page to fully load
  20 |     await page.waitForLoadState('networkidle');
  21 |     // Wait for any animations to complete
  22 |     await page.waitForTimeout(500);
  23 |     // Capture the full page screenshot
  24 |     await percySnapshot(page, 'Dashboard - Full Page');
  25 |   });
  26 | 
  27 |   test('Login form should match visual baseline @visual', async ({ loginPage, page }) => {
  28 |     await loginPage.goto();
  29 |     await page.waitForLoadState('networkidle');
  30 |     await page.waitForTimeout(500);
  31 |     await percySnapshot(page, 'Login Form');
  32 |   });
  33 | 
  34 |   test('Dashboard sidebar navigation should match visual baseline @visual', async ({
  35 |     page,
  36 |   }) => {
  37 |     // Take snapshot of just the sidebar
  38 |     const sidebar = page.locator('[class*="sidebar"]').first();
  39 |     await sidebar.waitFor({ state: 'visible' });
  40 |     await percySnapshot(page, 'Dashboard Sidebar', {
  41 |       scope: sidebar,
  42 |     });
  43 |   });
  44 | 
  45 |   test('Admin module page should match visual baseline @visual', async ({
  46 |     adminPage,
  47 |     page,
  48 |   }) => {
  49 |     await adminPage.navigateToUserManagement();
  50 |     await page.waitForLoadState('networkidle');
  51 |     await page.waitForTimeout(500);
  52 |     await percySnapshot(page, 'Admin - User Management');
  53 |   });
  54 | 
  55 |   test('PIM employee list should match visual baseline @visual', async ({
  56 |     pimPage,
  57 |     page,
  58 |   }) => {
  59 |     await pimPage.navigateToEmployeeList();
  60 |     await page.waitForLoadState('networkidle');
  61 |     await page.waitForTimeout(500);
  62 |     await percySnapshot(page, 'PIM - Employee List');
  63 |   });
  64 | });
  65 | 
```