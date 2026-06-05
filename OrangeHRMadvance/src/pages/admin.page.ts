import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminPage extends BasePage {

  // Navigation Tabs

  // User management tab
  readonly userManagementDropdown: Locator;
  readonly userOptLink: Locator;

   // job tab
  readonly jobDropdown: Locator;
  readonly jobTitlesOptLink: Locator;
  readonly payGradsOptLink: Locator;
  readonly employmentStatusOptLink: Locator;
  readonly jobCategoriesOptLink: Locator;
  readonly workShiftOptLin: Locator;

  // organization tab 
  readonly organizationDropdown: Locator;
  readonly generalInformationOptLink: Locator;
  readonly locationOptLink: Locator;
  readonly structureOptLink: Locator;

  // qualification tab
  readonly qualificationsDropdown: Locator;
  readonly skillsOptLink: Locator;
  readonly educationOptLink: Locator;
  readonly licensesOptLink: Locator;
  readonly languagesOptLink: Locator;
  readonly membershipOptLink: Locator;

  readonly nationalitiesTab: Locator;
  readonly corporateBrandingTab: Locator;

  // userConfigaration tab
  readonly userConfigurationDropdown: Locator;
  readonly emailConfigarationOptLink: Locator;
  readonly emailSubscraptionOptLink: Locator;
  readonly localizationOptLink: Locator;
  readonly languagePackageOptLink: Locator;
  readonly modulesOptLink: Locator;
  readonly socialMediaOthentactionOptLink: Locator;
  readonly registerOuthClintOptLink: Locator;
  readonly ldapConfigrationOptLink: Locator;
  

  //system users Form
  readonly UserNameInput: Locator;
  readonly UserRoleDropdown: Locator;
  readonly EmployeeNameInput: Locator;
  readonly StatusDropdown: Locator;
  readonly SearchButton: Locator;
  readonly ResetButton: Locator;

  //add button for navigate to add user form
  readonly AddButton: Locator;  

  //table rows and actions
  readonly tableRows: Locator
  readonly editButton: Locator;
  readonly deleteButton: Locator;


  constructor(page: Page) {
    super(page);    

    // Top Navigation Tabs
    // User management tab
    this.userManagementDropdown = page.getByLabel('Topbar Menu').getByText('User Management');
    this.userOptLink = page.getByRole('listitem').filter({ hasText: /^Users$/ });

    // job tab
    this.jobDropdown = page.getByText('Job', { exact: true });
    this.jobTitlesOptLink = page.getByRole('menuitem', { name: 'Job Titles' });
    this.payGradsOptLink = page.getByRole('menuitem', { name: 'Pay Grades' });
    this.employmentStatusOptLink = page.getByRole('menuitem', { name: 'Employment Status' });
    this.jobCategoriesOptLink = page.getByRole('menuitem', { name: 'Job Categories' });
    this.workShiftOptLin = page.getByRole('menuitem', { name: 'Work Shifts' });

    // organizaion tab
    this.organizationDropdown = page.getByLabel('Topbar Menu').getByText('Organization');
    this.generalInformationOptLink = page.getByRole('menuitem', { name: 'General Information' });
    this.locationOptLink = page.getByRole('menuitem', { name: 'Locations' });
    this.structureOptLink = page.getByRole('menuitem', { name: 'Structure' });

    //qualification tab
    this.qualificationsDropdown = page.getByText('Qualifications');
    this.skillsOptLink = page.getByRole('menuitem', { name: 'Skills' });
    this.educationOptLink = page.getByRole('menuitem', { name: 'Education' });
    this.licensesOptLink = page.getByRole('menuitem', { name: 'Licenses' });
    this.languagesOptLink = page.getByRole('menuitem', { name: 'Languages' });
    this.membershipOptLink = page.getByRole('menuitem', { name: 'Memberships' });


    this.nationalitiesTab = page.getByRole('link', { name: 'Nationalities' });
    this.corporateBrandingTab = page.getByRole('link', { name: 'Corporate Branding' });


    this.userConfigurationDropdown = page.getByText('Configuration')
    this.emailConfigarationOptLink = page.getByRole('menuitem', { name: 'Email Configuration' });
    this.emailSubscraptionOptLink = page.getByRole('menuitem', { name: 'Email Subscriptions' });
    this.localizationOptLink = page.getByRole('menuitem', { name: 'Localization' });
    this.languagePackageOptLink = page.getByRole('menuitem', { name: 'Language Packages' });
    this.modulesOptLink = page.getByRole('menuitem', { name: 'Modules' });
    this.socialMediaOthentactionOptLink = page.getByRole('menuitem', { name: 'Social Media Authentication' });
    this.registerOuthClintOptLink = page.getByRole('menuitem', { name: 'Register OAuth Client' });
    this.ldapConfigrationOptLink = page.getByRole('menuitem', { name: 'LDAP Configuration' })    

    //system users form locators
    this.UserNameInput = page.locator('.oxd-input[placeholder="Username"]');
    this.UserRoleDropdown = page.locator('.oxd-select-text--after');    
    this.EmployeeNameInput = page.locator('.oxd-input[placeholder="Employee Name"]');
    this.StatusDropdown = page.locator('.oxd-select-text--after');
    this.SearchButton = page.getByRole('button', { name: 'Search' });
    this.ResetButton = page.getByRole('button', { name: 'Reset' });

    //add button for navigate to add user form
    this.AddButton = page.getByRole('button', { name: 'Add' });

    //table rows and actions
    this.tableRows = page.locator('.oxd-table-card');
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  /**
   * Navigates to the Add User form by clicking the "Add" button.
   */
  async navigateToAddUser(): Promise<void> {
    await this.clickElement(this.AddButton, 'Add User Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fills in the Add User form and saves.
   * Handles the autocomplete dropdown for Employee Name.
   */
  async addUser(
    role: string,
    employeeName: string,
    status: string,
    username: string,
    password: string
  ): Promise<void> {
    // Select User Role
    const roleDropdown = this.page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
    await this.clickElement(roleDropdown, 'User Role Dropdown');
    await this.page.getByRole('option', { name: role, exact: true }).click();

    // Select Employee Name
    const employeeInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
    await this.fillInput(employeeInput, employeeName, 'Employee Name Input');
    // Wait for the autocomplete option containing the employee's name to appear and select it
    const option = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').filter({ hasText: employeeName }).first();
    await option.waitFor({ state: 'visible', timeout: 15000 });
    await option.click();

    // Select Status
    const statusDropdown = this.page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
    await this.clickElement(statusDropdown, 'Status Dropdown');
    await this.page.getByRole('option', { name: status, exact: true }).click();

    // Enter Username
    const usernameInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
    await this.fillInput(usernameInput, username, 'Username Input');

    // Enter Password
    const passwordInput = this.page.locator('.oxd-input-group').filter({ hasText: /^Password$/ }).locator('input');
    await this.fillInput(passwordInput, password, 'Password Input');

    // Enter Confirm Password
    const confirmPasswordInput = this.page.locator('.oxd-input-group').filter({ hasText: /^Confirm Password$/ }).locator('input');
    await this.fillInput(confirmPasswordInput, password, 'Confirm Password Input');

    // Click Save Button
    const saveBtn = this.page.getByRole('button', { name: 'Save' });
    await this.clickElement(saveBtn, 'Save Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Asserts the validation message under Username field.
   */
  async expectUsernameLengthError(expectedMessage: string): Promise<void> {
    const errorMsg = this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-input-group__message');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(expectedMessage);
  }

  /**
   * Searches for a user by their Username in the list.
   */
  async searchUserByUsername(username: string): Promise<void> {
    const searchUsernameInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
    await this.fillInput(searchUsernameInput, username, 'Search Username Input');
    await this.clickElement(this.SearchButton, 'Search Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Deletes a user by their username and confirms.
   */
  async deleteUser(username: string): Promise<void> {
    console.log(`[Action] Attempting to delete user with username: ${username}`);
    const row = this.tableRows.filter({ hasText: username });
    await expect(row).toBeVisible();

    const deleteBtn = row.locator('.bi-trash');
    await this.clickElement(deleteBtn, `Delete Icon for User: ${username}`);

    // Confirm deletion
    const confirmBtn = this.page.getByRole('button', { name: 'Yes, Delete' });
    await this.clickElement(confirmBtn, 'Yes, Delete Confirmation Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Asserts that a row containing the username is present/absent in the table.
   */
  async expectUserInTable(username: string, shouldBePresent: boolean): Promise<void> {
    const row = this.tableRows.filter({ hasText: username });
    if (shouldBePresent) {
      await expect(row).toBeVisible();
    } else {
      await expect(row).not.toBeVisible();
    }
  }

  /**
   * Navigates to Job Titles under the Job tab.
   */
  async navigateToJobTitles(): Promise<void> {
    await this.clickElement(this.jobDropdown, 'Job Dropdown Menu');
    await this.clickElement(this.jobTitlesOptLink, 'Job Titles Option');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Adds a Job Title with a description and optional specification file.
   */
  async addJobTitle(
    title: string,
    description: string,
    specFilePath?: string
  ): Promise<void> {
    await this.clickElement(this.AddButton, 'Add Job Title Button');
    await this.page.waitForLoadState('domcontentloaded');

    // Job Title
    const titleInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('input');
    await this.fillInput(titleInput, title, 'Job Title Input');

    // Job Description
    const descTextarea = this.page.locator('.oxd-input-group').filter({ hasText: 'Job Description' }).locator('textarea');
    await this.fillInput(descTextarea, description, 'Job Description Textarea');

    // Spec file upload
    if (specFilePath) {
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(specFilePath);
    }

    // Save
    const saveBtn = this.page.getByRole('button', { name: 'Save' });
    await this.clickElement(saveBtn, 'Save Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Asserts the validation message under Job Specification file input field.
   */
  async expectJobSpecSizeError(expectedMessage: string): Promise<void> {
    const errorMsg = this.page.locator('.oxd-input-group__message');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(expectedMessage);
  }

  /**
   * Asserts whether a job title is listed in the table.
   */
  async expectJobTitleInTable(title: string, shouldBePresent: boolean): Promise<void> {
    const row = this.tableRows.filter({ hasText: title });
    if (shouldBePresent) {
      await expect(row).toBeVisible();
    } else {
      await expect(row).not.toBeVisible();
    }
  }

  /**
   * Deletes a Job Title and confirms.
   */
  async deleteJobTitle(title: string): Promise<void> {
    console.log(`[Action] Attempting to delete job title: ${title}`);
    const row = this.tableRows.filter({ hasText: title });
    await expect(row).toBeVisible();

    const deleteBtn = row.locator('.bi-trash');
    await this.clickElement(deleteBtn, `Delete Icon for Job Title: ${title}`);

    // Confirm deletion
    const confirmBtn = this.page.getByRole('button', { name: 'Yes, Delete' });
    await this.clickElement(confirmBtn, 'Yes, Delete Confirmation Button');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigates to Organization General Information.
   */
  async navigateToGeneralInformation(): Promise<void> {
    await this.clickElement(this.organizationDropdown, 'Organization Dropdown Menu');
    await this.clickElement(this.generalInformationOptLink, 'General Information Option');
    await this.waitForLoaderToDisappear();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Updates Organization Name and returns the old name for restoration.
   */
  async updateOrganizationName(newName: string): Promise<string> {
    await this.waitForLoaderToDisappear();
    const orgNameInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Organization Name' }).locator('input');
    
    // Check if the input is disabled. If so, enable edit mode.
    const isDisabled = await orgNameInput.isDisabled();
    if (isDisabled) {
      const editToggle = this.page.locator('.oxd-switch-input');
      await this.clickElement(editToggle, 'Edit Toggle Switch');
      await this.waitForLoaderToDisappear();
    }

    await expect(orgNameInput).toBeEnabled({ timeout: 15000 });
    const oldName = await orgNameInput.inputValue();
    await this.fillInput(orgNameInput, newName, 'Organization Name Input');

    const saveBtn = this.page.getByRole('button', { name: 'Save' });
    await this.clickElement(saveBtn, 'Save Button');
    await this.waitForLoaderToDisappear();
    await this.page.waitForLoadState('domcontentloaded');

    return oldName;
  }

  /**
   * Verifies the Organization Name.
   */
  async expectOrganizationName(expectedName: string): Promise<void> {
    const orgNameInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Organization Name' }).locator('input');
    await expect(orgNameInput).toHaveValue(expectedName);
  }
}
