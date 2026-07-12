import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MyInfoPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly personalDetailsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = this.page.locator('.oxd-topbar-header-title h6').first();
    this.personalDetailsLink = this.page.locator('a:has-text("Personal Details")');
  }

  public async getHeaderTitle(): Promise<string> {
    await this.waitForVisible(this.headerTitle, 30000);
    return this.getText(this.headerTitle);
  }

  public async isMyInfoPageLoaded(): Promise<boolean> {
    try {
      await this.waitForVisible(this.headerTitle, 30000);
      return this.isVisible(this.headerTitle);
    } catch {
      return false;
    }
  }
}
