import { test as setup } from '../src/fixtures/page.fixture';
import { LoginHelper } from '../src/helpers/login.helper';
import { EnvironmentUtil } from '../src/utils/environment.util';
import * as path from 'path';

const authFile = path.resolve(__dirname, '../.playwright/auth/user.json');

setup('authenticate as admin', async ({ pageFactory, pageFixture }) => {
  const username = EnvironmentUtil.getEnvString('ORANGEHRM_USERNAME', 'Admin');
  const password = EnvironmentUtil.getEnvString('ORANGEHRM_PASSWORD', 'admin123');

  const loginPage = pageFactory.getLoginPage();
  const loginHelper = new LoginHelper(loginPage);
  await loginHelper.loginToSystem(username, password);

  const dashboard = pageFactory.getDashboardPage();
  const isLoaded = await dashboard.isDashboardLoaded();
  if (!isLoaded) {
    throw new Error('Failed to log in to system for authentication setup');
  }

  // Save storage state to shared JSON file
  await pageFixture.context().storageState({ path: authFile });
});
