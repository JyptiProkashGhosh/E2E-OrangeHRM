import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class DashboardPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly userDropdown: Locator;
  private readonly logoutLink: Locator;

  // Dashboard widgets
  private readonly dashboardWidgets: Locator;
  private readonly quickLaunchContainer: Locator;
  private readonly myActionsContainer: Locator;
  private readonly employeesOnLeaveContainer: Locator;

  // User Dropdown elements
  private readonly aboutLink: Locator;
  private readonly supportLink: Locator;
  private readonly changePasswordLink: Locator;
  private readonly aboutModal: Locator;
  private readonly aboutModalCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = this.page.locator('.oxd-topbar-header-title h6').first();
    this.userDropdown = this.page.locator('.oxd-userdropdown-tab');
    this.logoutLink = this.page.getByRole('menuitem', { name: 'Logout' });

    // Widgets locators
    this.dashboardWidgets = this.page.locator('.oxd-sheet');
    this.quickLaunchContainer = this.page.locator('.oxd-sheet').filter({ hasText: 'Quick Launch' });
    this.myActionsContainer = this.page.locator('.oxd-sheet').filter({ hasText: 'My Actions' });
    this.employeesOnLeaveContainer = this.page.locator('.oxd-sheet').filter({ hasText: 'Employees on Leave Today' });

    // Dropdown links
    this.aboutLink = this.page.getByRole('menuitem', { name: 'About' });
    this.supportLink = this.page.getByRole('menuitem', { name: 'Support' });
    this.changePasswordLink = this.page.getByRole('menuitem', { name: 'Change Password' });
    
    // Modal dialog
    this.aboutModal = this.page.locator('.oxd-dialog-container-default');
    this.aboutModalCloseButton = this.page.locator('.oxd-dialog-close-button');
  }

  public async getHeaderTitle(): Promise<string> {
    await this.waitForVisible(this.headerTitle, 30000);
    return this.getText(this.headerTitle);
  }

  public getHeaderTitleLocator(): Locator {
    return this.headerTitle;
  }

  public async isDashboardLoaded(): Promise<boolean> {
    try {
      await this.waitForVisible(this.headerTitle, 30000);
      await this.waitForVisible(this.quickLaunchContainer, 30000);
      
      // Wait for the dynamic quick launch tiles to finish loading / hydrating
      const assignLeaveTile = this.quickLaunchContainer.getByText('Assign Leave').first();
      await this.waitForVisible(assignLeaveTile, 30000);
      
      return this.isVisible(this.headerTitle);
    } catch {
      return false;
    }
  }

  public async logout(): Promise<void> {
    await this.waitForVisible(this.userDropdown, 30000);
    await this.click(this.userDropdown);
    await this.waitForVisible(this.logoutLink, 30000);
    await this.click(this.logoutLink);
  }

  public getUserDropdownLocator(): Locator {
    return this.userDropdown;
  }

  /**
   * Checks if a widget with the given title is visible on the dashboard.
   */
  public async isWidgetVisible(widgetTitle: string): Promise<boolean> {
    const widget = this.dashboardWidgets.filter({ hasText: widgetTitle }).first();
    return this.isVisible(widget);
  }

  /**
   * Clicks a Quick Launch tile by its display name.
   */
  public async clickQuickLaunchTile(tileName: string): Promise<void> {
    logger.info(`DashboardPage: Clicking Quick Launch tile: ${tileName}`);
    await this.waitForVisible(this.quickLaunchContainer, 30000);
    
    // Locate the card container containing the text
    const card = this.page.locator('.orangehrm-quick-launch-card').filter({ hasText: tileName }).first();
    await this.waitForVisible(card, 15000);
    await this.click(card);
  }

  /**
   * Opens the user dropdown and selects a specific menu option.
   */
  public async clickUserDropdownOption(optionName: string): Promise<void> {
    logger.info(`DashboardPage: Selecting user dropdown option: ${optionName}`);
    await this.waitForVisible(this.userDropdown, 30000);
    await this.click(this.userDropdown);
    
    const option = this.page.getByRole('menuitem', { name: optionName });
    await this.waitForVisible(option, 15000);
    await this.click(option);
  }

  /**
   * Verifies the About modal is loaded and closes it.
   */
  public async verifyAndCloseAboutModal(): Promise<boolean> {
    await this.waitForVisible(this.aboutModal, 15000);
    const visible = await this.isVisible(this.aboutModal);
    if (visible) {
      await this.click(this.aboutModalCloseButton);
      await this.waitForHidden(this.aboutModal, 15000);
    }
    return visible;
  }

  /**
   * Checks if any employee is listed on leave today in the widget.
   */
  public async isEmployeeOnLeaveVisible(employeeName: string): Promise<boolean> {
    const leaveRow = this.employeesOnLeaveContainer.locator('p, span').filter({ hasText: employeeName }).first();
    return this.isVisible(leaveRow);
  }
}
