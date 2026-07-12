import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DirectoryPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = this.page.locator('.oxd-topbar-header-title h6').first();
    this.searchButton = this.page.locator('button[type="submit"]');
  }

  public async getHeaderTitle(): Promise<string> {
    await this.waitForVisible(this.headerTitle, 30000);
    return this.getText(this.headerTitle);
  }

  public async isDirectoryPageLoaded(): Promise<boolean> {
    try {
      await this.waitForVisible(this.headerTitle, 30000);
      return this.isVisible(this.headerTitle);
    } catch {
      return false;
    }
  }
}
