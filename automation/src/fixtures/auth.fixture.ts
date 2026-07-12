import { test as pageTest } from './page.fixture';
import { APIRequestContext, Page } from '@playwright/test';
import { UserCredentials } from '../types';
import { ServiceFactory } from '../services/service.factory';
import { LoginHelper } from '../helpers/login.helper';
import { CleanupHelper } from '../helpers/cleanup.helper';
import { logger } from '../utils/logger';
import { EnvironmentUtil } from '../utils/environment.util';

interface AuthFixtures {
  apiContext: APIRequestContext;
  adminUser: UserCredentials;
  employeeUser: UserCredentials;
  cleanupFixture: CleanupHelper;
  serviceFactory: ServiceFactory;
  authenticatedPage: Page;
}

export const test = pageTest.extend<AuthFixtures>({
  adminUser: async ({}, use) => {
    // Avoid collision with Windows OS USERNAME env variable
    const username = EnvironmentUtil.getEnvString('ORANGEHRM_USERNAME', 'Admin');
    const password = EnvironmentUtil.getEnvString('ORANGEHRM_PASSWORD', 'admin123');
    await use({ username, password, role: 'Admin' });
  },

  employeeUser: async ({}, use) => {
    await use({ username: 'employee_user', password: 'password123', role: 'ESS' });
  },

  apiContext: async ({ playwright }, use) => {
    logger.debug('Initializing apiContext request fixture');
    const url = EnvironmentUtil.getEnvString('BASE_URL', 'https://opensource-demo.orangehrmlive.com');
    const context = await playwright.request.newContext({
      baseURL: url,
    });
    await use(context);
    await context.dispose();
  },

  cleanupFixture: async ({ apiContext }, use) => {
    logger.info('Initializing cleanupFixture');
    const cleanup = new CleanupHelper(apiContext);
    await use(cleanup);
    logger.info('Teardown: Running cleanup process');
    await cleanup.performCleanup();
  },

  serviceFactory: async ({ pageFactory, apiContext }, use) => {
    logger.info('Initializing ServiceFactory fixture');
    const factory = new ServiceFactory(pageFactory, apiContext);
    await use(factory);
  },

  authenticatedPage: async ({ pageFixture, pageFactory }, use) => {
    logger.info('Initializing authenticatedPage session using cached state');
    const dashboard = pageFactory.getDashboardPage();
    
    // Navigate directly to the dashboard
    await dashboard.open('/web/index.php/dashboard/index');
    
    // Assert dashboard load
    const isLoaded = await dashboard.isDashboardLoaded();
    if (!isLoaded) {
      logger.error('Failed to load dashboard with cached session state');
    }
    
    await use(pageFixture);
  },
});

export { expect } from './page.fixture';
