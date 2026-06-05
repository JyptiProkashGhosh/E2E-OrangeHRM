import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly sidebarMenu: Locator;
  readonly pageHeaderTitle: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarMenu = page.locator('.oxd-sidepanel');
    this.pageHeaderTitle = page.locator('.oxd-topbar-header-title h6').first();
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  /**
   * Helper to click on any sidebar link by its name.
   */
  async clickSidebarMenuLink(name: string): Promise<void> {
    const link = this.page.getByRole('link', { name: name, exact: false });
    await this.clickElement(link, `Sidebar link: ${name}`);
  }

  /**
   * Navigates to PIM module.
   */
  async clickPIM(): Promise<void> {
    await this.clickSidebarMenuLink('PIM');
  }
  /**
   * Navigates to Admin module.
   */
  async clickAdmin(): Promise<void> {
    await this.clickSidebarMenuLink('Admin');
  }

  /**
   * Navigates to Dashboard module.
   */
  async clickDashboard(): Promise<void> {
    await this.clickSidebarMenuLink('Dashboard');
  }

  /**
   * Performs logout.
   */
  async logout(): Promise<void> {
    await this.clickElement(this.userDropdown, 'User Dropdown Menu');
    await this.clickElement(this.logoutLink, 'Logout link');
  }

  /**
   * Assert page header title is visible and contains expected text.
   */
  async expectHeaderTitle(expectedText: string): Promise<void> {
    await this.waitForElementVisible(this.pageHeaderTitle);
    await expect(this.pageHeaderTitle).toContainText(expectedText);
  }
}
