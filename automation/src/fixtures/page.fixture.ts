import { test as baseTest, Browser, BrowserContext, Page } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { logger } from '../utils/logger';

interface PageFixtures {
  browserFixture: Browser;
  contextFixture: BrowserContext;
  pageFixture: Page;
  pageFactory: PageFactory;
}

export const test = baseTest.extend<PageFixtures>({
  browserFixture: async ({ browser }, use) => {
    logger.debug('Injecting browserFixture');
    await use(browser);
  },

  contextFixture: async ({ context }, use) => {
    logger.debug('Injecting contextFixture');
    await use(context);
  },

  pageFixture: async ({ page }, use) => {
    logger.debug('Injecting pageFixture');
    await use(page);
  },

  pageFactory: async ({ pageFixture }, use) => {
    logger.info('Initializing PageFactory fixture');
    const factory = new PageFactory(pageFixture);
    await use(factory);
  },
});

export { expect } from '@playwright/test';
