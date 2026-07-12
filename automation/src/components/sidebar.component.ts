import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { logger } from '../utils/logger';

export class SidebarComponent extends BasePage {
  private readonly sidebarContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarContainer = this.page.locator('.oxd-sidepanel');
  }

  private getMenuItemLocator(name: string): Locator {
    return this.sidebarContainer.locator(`.oxd-main-menu-item:has-text("${name}")`);
  }

  public async clickAdmin(): Promise<void> {
    logger.info('Sidebar: Clicking Admin link');
    await this.click(this.getMenuItemLocator('Admin'));
  }

  public async clickPim(): Promise<void> {
    logger.info('Sidebar: Clicking PIM link');
    await this.click(this.getMenuItemLocator('PIM'));
  }

  public async clickLeave(): Promise<void> {
    logger.info('Sidebar: Clicking Leave link');
    await this.click(this.getMenuItemLocator('Leave'));
  }

  public async clickRecruitment(): Promise<void> {
    logger.info('Sidebar: Clicking Recruitment link');
    await this.click(this.getMenuItemLocator('Recruitment'));
  }

  public async clickMyInfo(): Promise<void> {
    logger.info('Sidebar: Clicking My Info link');
    await this.click(this.getMenuItemLocator('My Info'));
  }

  public async clickDirectory(): Promise<void> {
    logger.info('Sidebar: Clicking Directory link');
    await this.click(this.getMenuItemLocator('Directory'));
  }

  public async clickDashboard(): Promise<void> {
    logger.info('Sidebar: Clicking Dashboard link');
    await this.click(this.getMenuItemLocator('Dashboard'));
  }

  public async isSidebarVisible(): Promise<boolean> {
    return this.isVisible(this.sidebarContainer);
  }
}
