import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class AdminPage extends BasePage {
  // Navigation elements
  private readonly topbarNav: Locator;

  // Common buttons
  private readonly addButton: Locator;
  private readonly saveButton: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly yesDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.topbarNav = this.page.locator('.oxd-topbar-body-nav');
    
    this.addButton = this.page.getByRole('button', { name: 'Add' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
    this.resetButton = this.page.getByRole('button', { name: 'Reset' });
    this.yesDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });
  }

  /**
   * Open a specific dropdown in horizontal menu and click the sub-item.
   */
  private async navigateMenu(dropdownName: string, menuItemName: string): Promise<void> {
    logger.info(`AdminPage: Navigating to ${dropdownName} -> ${menuItemName}`);
    // Wait for the Admin topbar to be visible
    await this.waitForVisible(this.topbarNav, 20000);
    
    const dropdownTab = this.page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: dropdownName }).first();
    await this.waitForVisible(dropdownTab, 15000);
    await this.click(dropdownTab);

    const menuItem = this.page.getByRole('menuitem', { name: menuItemName });
    await this.waitForVisible(menuItem, 10000);
    await this.click(menuItem);

    // Wait for add button or main content container to display
    await this.page.waitForTimeout(1000);
  }

  public async navigateToUserManagement(): Promise<void> {
    await this.navigateMenu('User Management', 'Users');
  }

  public async navigateToJobTitles(): Promise<void> {
    await this.navigateMenu('Job', 'Job Titles');
  }

  public async navigateToLocations(): Promise<void> {
    await this.navigateMenu('Organization', 'Locations');
  }

  public async clickAdd(): Promise<void> {
    await this.waitForVisible(this.addButton, 15000);
    await this.click(this.addButton);
  }

  public async clickSave(): Promise<void> {
    await this.waitForVisible(this.saveButton, 15000);
    await this.click(this.saveButton);
  }

  public async clickSearch(): Promise<void> {
    await this.waitForVisible(this.searchButton, 15000);
    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  public async clickReset(): Promise<void> {
    await this.waitForVisible(this.resetButton, 15000);
    await this.click(this.resetButton);
    await this.page.waitForTimeout(2000);
  }

  // --- User Management Actions ---

  public async fillAddUserForm(userRole: string, employeeNameHint: string, status: string, username: string, password: string): Promise<string> {
    await this.selectDropdownOption('User Role', userRole);
    const resolvedName = await this.selectAutocompleteFirstSuggestion('Employee Name', employeeNameHint);
    await this.selectDropdownOption('Status', status);
    await this.fillFieldByLabel('Username', username);
    await this.fillFieldByLabel('Password', password);
    await this.fillFieldByLabel('Confirm Password', password);
    return resolvedName;
  }

  public async searchUsersTable(username: string, userRole?: string): Promise<void> {
    await this.fillFieldByLabel('Username', username);
    if (userRole) {
      await this.selectDropdownOption('User Role', userRole);
    }
    await this.clickSearch();
  }

  public getUserRowLocator(username: string): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-card').filter({
      has: this.page.locator('.oxd-table-cell:nth-child(2)').filter({ hasText: new RegExp(`^\\s*${username}\\s*$`, 'i') })
    });
  }

  public async deleteUserFromTable(username: string): Promise<void> {
    logger.info(`AdminPage: Deleting user "${username}"`);
    const row = this.getUserRowLocator(username);
    await this.waitForVisible(row, 15000);
    
    const trashBtn = row.locator('.bi-trash');
    await this.waitForVisible(trashBtn, 10000);
    await this.click(trashBtn);

    await this.waitForVisible(this.yesDeleteButton, 10000);
    await this.click(this.yesDeleteButton);
  }

  // --- Job Titles Actions ---

  public async fillJobTitleForm(title: string, description: string, note: string, docPath: string): Promise<void> {
    await this.fillFieldByLabel('Job Title', title);
    await this.fillTextareaByLabel('Job Description', description);
    await this.fillTextareaByLabel('Note', note);

    logger.info(`AdminPage: Uploading job spec document: ${docPath}`);
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(docPath);
  }

  public getJobTitleRowLocator(title: string): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-card').filter({
      has: this.page.locator('.oxd-table-cell:nth-child(2)').filter({ hasText: new RegExp(`^\\s*${title}\\s*$`, 'i') })
    });
  }

  public async isJobTitleInList(title: string): Promise<boolean> {
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    
    let row = this.getJobTitleRowLocator(title);
    const isFound = await row.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (isFound) return true;

    // Optional pagination check
    const nextButton = this.page.locator('.oxd-pagination-page-item--previous-next').filter({
      has: this.page.locator('.bi-chevron-right')
    });
    if (await nextButton.isVisible()) {
      let pageNum = 1;
      while (await nextButton.isVisible() && pageNum < 10) {
        await nextButton.click();
        await this.page.waitForTimeout(1000);
        pageNum++;
        row = this.getJobTitleRowLocator(title);
        if (await this.isVisible(row)) return true;
      }
    }
    return false;
  }

  public async deleteJobTitle(title: string): Promise<void> {
    logger.info(`AdminPage: Deleting Job Title "${title}"`);
    const row = this.getJobTitleRowLocator(title);
    await this.waitForVisible(row, 15000);
    
    const trashBtn = row.locator('.bi-trash');
    await this.waitForVisible(trashBtn, 10000);
    await this.click(trashBtn);

    await this.waitForVisible(this.yesDeleteButton, 10000);
    await this.click(this.yesDeleteButton);
  }

  // --- Locations Actions ---

  public async fillLocationForm(name: string, country: string, city: string): Promise<void> {
    await this.fillFieldByLabel('Name', name);
    await this.selectDropdownOption('Country', country);
    await this.fillFieldByLabel('City', city);
  }

  public async searchLocationsTable(name: string): Promise<void> {
    await this.fillFieldByLabel('Name', name);
    await this.clickSearch();
  }

  public getLocationRowLocator(name: string): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-card').filter({
      has: this.page.locator('.oxd-table-cell:nth-child(2)').filter({ hasText: new RegExp(`^\\s*${name}\\s*$`, 'i') })
    });
  }

  public async deleteLocation(name: string): Promise<void> {
    logger.info(`AdminPage: Deleting Location "${name}"`);
    const row = this.getLocationRowLocator(name);
    await this.waitForVisible(row, 15000);
    
    const trashBtn = row.locator('.bi-trash');
    await this.waitForVisible(trashBtn, 10000);
    await this.click(trashBtn);

    await this.waitForVisible(this.yesDeleteButton, 10000);
    await this.click(this.yesDeleteButton);
  }
}
