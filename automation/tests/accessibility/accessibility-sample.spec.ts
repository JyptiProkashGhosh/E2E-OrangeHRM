import { test, expect } from '../../src/fixtures/auth.fixture';
import AxeBuilder from '@axe-core/playwright';
import { logger } from '../../src/utils/logger';

test.describe('OrangeHRM Accessibility Scans', () => {
  test('Audit login page layout for accessibility violations @accessibility', async ({ pageFactory }) => {
    const loginPage = pageFactory.getLoginPage();
    await loginPage.navigateToLogin();

    const page = (loginPage as any).page;
    logger.info('Starting accessibility scan on OrangeHRM login page...');

    const results = await new AxeBuilder({ page }).analyze();
    logger.info(`Accessibility scan completed. Violations count: ${results.violations.length}`);

    expect(results).toBeDefined();
    expect(results.violations).toBeDefined();
  });
});
