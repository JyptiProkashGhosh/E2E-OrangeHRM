import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';

test('Dump quick launch HTML', async ({ authenticatedPage, pageFactory }) => {
  const dashboardPage = pageFactory.getDashboardPage();
  await dashboardPage.isDashboardLoaded();
  
  const quickLaunchCard = authenticatedPage.locator('.oxd-sheet').filter({ hasText: 'Quick Launch' });
  const html = await quickLaunchCard.innerHTML();
  logger.info(`Quick Launch HTML: ${html}`);
});
