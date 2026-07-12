import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { logger } from '../utils/logger';

export class HeaderComponent extends BasePage {
  private readonly profileDropdown: Locator;
  private readonly userNameLabel: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.profileDropdown = this.page.locator('.oxd-userdropdown-tab');
    this.userNameLabel = this.page.locator('.oxd-userdropdown-name');
    this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
  }

  public async getUserName(): Promise<string> {
    return this.getText(this.userNameLabel);
  }

  public async clickProfileDropdown(): Promise<void> {
    logger.info('Header: Clicking profile user dropdown menu');
    await this.click(this.profileDropdown);
  }

  public async clickLogout(): Promise<void> {
    logger.info('Header: Clicking Logout button');
    await this.click(this.logoutButton);
  }

  public async isHeaderVisible(): Promise<boolean> {
    return this.isVisible(this.profileDropdown);
  }
}
