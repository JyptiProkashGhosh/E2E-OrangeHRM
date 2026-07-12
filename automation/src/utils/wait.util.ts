import { Page } from '@playwright/test';
import { logger } from './logger';

export class WaitUtil {
  /**
   * Sleep for a specified amount of time in milliseconds.
   */
  public static async delay(ms: number): Promise<void> {
    logger.debug(`Sleeping for ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Wait for network idle state.
   */
  public static async waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
    logger.debug('Waiting for network idle state');
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM content to be fully loaded.
   */
  public static async waitForDomLoaded(page: Page, timeout: number = 10000): Promise<void> {
    logger.debug('Waiting for DOM content loaded state');
    await page.waitForLoadState('domcontentloaded', { timeout });
  }
}
