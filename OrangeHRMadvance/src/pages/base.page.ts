import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific path using the configured base URL.
   */
  async navigate(path: string): Promise<void> {
    console.log(`[Navigation] Navigating to: ${path}`);
    await this.page.goto(path);
  }

  /**
   * Waits for the network to be idle.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Gets the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Takes a full page screenshot and saves it.
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
    console.log(`[Screenshot] Saving screenshot to: ${screenshotPath}`);
    return this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  /**
   * Premium click wrapper with automatic logging and optional click configurations.
   */
  async clickElement(locator: Locator, description: string, options?: Parameters<Locator['click']>[0]): Promise<void> {
    console.log(`[Action] Clicking on: ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click(options);
  }

  /**
   * Premium input filler wrapper with automatic logging and clearing.
   */
  async fillInput(locator: Locator, text: string, description: string): Promise<void> {
    console.log(`[Action] Entering text into: ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Premium wait wrapper for checking visibility.
   */
  async waitForElementVisible(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits for the global or form-level loading spinner to disappear.
   */
  async waitForLoaderToDisappear(): Promise<void> {
    const loader = this.page.locator('.oxd-form-loader, .oxd-loading-spinner');
    // First wait a brief moment for the loader to potentially render/appear
    await this.page.waitForTimeout(300);
    // Wait for the loader to be hidden/detached
    await loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {
      // Ignore if it's already gone or wasn't present
    });
  }
}
