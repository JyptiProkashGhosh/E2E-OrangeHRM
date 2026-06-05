import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { TestData } from '../src/utils/test-data';
import * as path from 'path';
import * as fs from 'fs';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate as Admin', async ({ page }) => {
  console.log('[Auth Setup] Starting global authentication setup...');

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TestData.auth.adminUsername, TestData.auth.adminPassword);

  // Assert successful navigation to dashboard
  await expect(page).toHaveURL(/.*dashboard.*/);
  console.log('[Auth Setup] Logged in successfully. Storing storage state...');

  // Ensure storage state directory exists
  const dir = path.dirname(authFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save authentication state
  await page.context().storageState({ path: authFile });
  console.log(`[Auth Setup] Stored authentication state at: ${authFile}`);
});
