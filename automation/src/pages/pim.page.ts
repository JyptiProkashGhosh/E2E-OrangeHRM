import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class PIMPage extends BasePage {
  // Tabs
  private readonly employeeListTab: Locator;
  private readonly addEmployeeTab: Locator;

  // Add Employee
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly createLoginDetailsSwitch: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly statusEnabledRadio: Locator;
  private readonly statusDisabledRadio: Locator;
  private readonly photoUploadInput: Locator;
  private readonly saveButton: Locator;

  // Employee List
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly tableCards: Locator;
  private readonly selectAllCheckbox: Locator;
  private readonly deleteSelectedButton: Locator;
  private readonly yesDeleteButton: Locator;

  // Personal Details / Tabs
  private readonly personalDetailsTabLink: Locator;
  private readonly contactDetailsTabLink: Locator;
  private readonly emergencyContactsTabLink: Locator;
  private readonly dependentsTabLink: Locator;
  private readonly immigrationTabLink: Locator;
  private readonly jobTabLink: Locator;
  private readonly salaryTabLink: Locator;
  private readonly attachmentsTabLink: Locator;
  private readonly profilePhoto: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeListTab = this.page.locator('a:has-text("Employee List")');
    this.addEmployeeTab = this.page.locator('a:has-text("Add Employee")');

    // Add Employee Page
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.middleNameInput = this.page.locator('input[name="middleName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.employeeIdInput = this.page.locator('.oxd-grid-2 input.oxd-input').first();
    this.createLoginDetailsSwitch = this.page.locator('.oxd-switch-input');
    this.usernameInput = this.page.locator('.oxd-input-group:has-text("Username") input');
    this.passwordInput = this.page.locator('.oxd-input-group:has-text("Password") input').first();
    this.confirmPasswordInput = this.page.locator('.oxd-input-group:has-text("Confirm Password") input');
    this.statusEnabledRadio = this.page.locator('label:has-text("Enabled") input[type="radio"]');
    this.statusDisabledRadio = this.page.locator('label:has-text("Disabled") input[type="radio"]');
    this.photoUploadInput = this.page.locator('input[type="file"]');
    this.saveButton = this.page.locator('button[type="submit"]').first();

    // List Page
    this.searchButton = this.page.locator('button[type="submit"]');
    this.resetButton = this.page.locator('button:has-text("Reset")');
    this.tableCards = this.page.locator('.oxd-table-body .oxd-table-card');
    this.selectAllCheckbox = this.page.locator('.oxd-table-header .oxd-checkbox-input');
    this.deleteSelectedButton = this.page.locator('button:has-text("Delete Selected")');
    this.yesDeleteButton = this.page.locator('button:has-text("Yes, Delete")');

    // Side Tabs on Personal Details / Edit screen
    this.personalDetailsTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Personal Details")');
    this.contactDetailsTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Contact Details")');
    this.emergencyContactsTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Emergency Contacts")');
    this.dependentsTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Dependents")');
    this.immigrationTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Immigration")');
    this.jobTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Job")');
    this.salaryTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Salary")');
    this.attachmentsTabLink = this.page.locator('.orangehrm-tabs-item:has-text("Attachments")');
    this.profilePhoto = this.page.locator('.employee-image');
  }

  // --- Add Employee ---

  public async navigateToAddEmployee(): Promise<void> {
    logger.info('PIMPage: Navigating to Add Employee');
    await this.waitForVisible(this.addEmployeeTab, 15000);
    await this.click(this.addEmployeeTab);
  }

  public async navigateToEmployeeList(): Promise<void> {
    logger.info('PIMPage: Navigating to Employee List');
    await this.waitForVisible(this.employeeListTab, 15000);
    await this.click(this.employeeListTab);
  }

  public async fillEmployeeMandatoryFields(firstName: string, lastName: string, middleName?: string): Promise<string> {
    logger.info(`PIMPage: Filling mandatory fields: ${firstName} ${lastName}`);
    await this.waitForVisible(this.firstNameInput, 30000);
    await this.fill(this.firstNameInput, firstName);
    if (middleName) {
      await this.fill(this.middleNameInput, middleName);
    }
    await this.fill(this.lastNameInput, lastName);
    
    // Generate a unique 6-digit employee ID to prevent collisions across parallel workers
    const uniqueEmpId = Math.floor(100000 + Math.random() * 899999).toString();
    await this.fill(this.employeeIdInput, uniqueEmpId);
    
    logger.info(`PIMPage: Set unique Employee ID: ${uniqueEmpId}`);
    return uniqueEmpId;
  }

  public async fillEmployeeId(empId: string): Promise<void> {
    await this.fill(this.employeeIdInput, empId);
  }

  public async toggleCreateLoginDetails(enable: boolean = true): Promise<void> {
    logger.info(`PIMPage: Setting Create Login Details switch to ${enable}`);
    const isChecked = await this.page.locator('.oxd-switch-input').evaluate((el: any) => {
      // Evaluate if the switch is currently checked
      return el.closest('label').querySelector('input').checked;
    });
    if (isChecked !== enable) {
      await this.click(this.createLoginDetailsSwitch);
    }
  }

  public async fillLoginDetails(username: string, password: string, status: 'Enabled' | 'Disabled' = 'Enabled'): Promise<void> {
    logger.info(`PIMPage: Filling login details for username ${username}`);
    await this.waitForVisible(this.usernameInput, 15000);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.fill(this.confirmPasswordInput, password);
    
    if (status === 'Enabled') {
      await this.page.locator('label:has-text("Enabled")').click();
    } else {
      await this.page.locator('label:has-text("Disabled")').click();
    }
  }

  public async uploadPhoto(absolutePath: string): Promise<void> {
    logger.info(`PIMPage: Uploading profile photo from path ${absolutePath}`);
    await this.photoUploadInput.setInputFiles(absolutePath);
  }

  public async clickSave(): Promise<void> {
    logger.info('PIMPage: Clicking Save button');
    // Find the exact save button on PIM forms (usually first submit button or Save text button)
    const saveBtn = this.page.locator('button[type="submit"], button:has-text("Save")').first();
    await this.waitForVisible(saveBtn, 15000);
    await this.click(saveBtn);
  }

  // --- Side tab navigation on Details page ---

  public async clickPersonalDetailsTab(): Promise<void> {
    await this.waitForVisible(this.personalDetailsTabLink, 30000);
    await this.click(this.personalDetailsTabLink);
  }

  public async clickJobTab(): Promise<void> {
    await this.waitForVisible(this.jobTabLink, 30000);
    await this.click(this.jobTabLink);
  }

  public async clickSalaryTab(): Promise<void> {
    await this.waitForVisible(this.salaryTabLink, 30000);
    await this.click(this.salaryTabLink);
  }

  public async clickEmergencyContactsTab(): Promise<void> {
    await this.waitForVisible(this.emergencyContactsTabLink, 30000);
    await this.click(this.emergencyContactsTabLink);
  }

  public async clickDependentsTab(): Promise<void> {
    await this.waitForVisible(this.dependentsTabLink, 30000);
    await this.click(this.dependentsTabLink);
  }

  public async clickImmigrationTab(): Promise<void> {
    await this.waitForVisible(this.immigrationTabLink, 30000);
    await this.click(this.immigrationTabLink);
  }

  public async clickAttachmentsTab(): Promise<void> {
    await this.waitForVisible(this.attachmentsTabLink, 30000);
    await this.click(this.attachmentsTabLink);
  }

  public async isProfilePhotoVisible(): Promise<boolean> {
    await this.waitForVisible(this.profilePhoto, 30000);
    // OrangeHRM profile photo shows default silhouette or actual photo
    return this.isVisible(this.profilePhoto);
  }

  // --- Edit Details Page Actions ---

  public async editPersonalDetails(nationality: string, maritalStatus: string, dob: string, gender: 'Male' | 'Female'): Promise<void> {
    logger.info('PIMPage: Editing personal details');
    await this.selectDropdownOption('Nationality', nationality);
    await this.selectDropdownOption('Marital Status', maritalStatus);
    
    // Fill Date of Birth
    const dobInput = this.getFormFieldGroup('Date of Birth').locator('input');
    await this.fill(dobInput, dob);
    
    if (gender === 'Male') {
      await this.page.getByText('Male', { exact: true }).click();
    } else {
      await this.page.getByText('Female', { exact: true }).click();
    }
  }

  public async editJobDetails(jobTitle: string, subUnit: string, empStatus: string, joinDate: string): Promise<void> {
    logger.info('PIMPage: Editing job details');
    await this.selectDropdownOption('Job Title', jobTitle);
    await this.selectDropdownOption('Sub Unit', subUnit);
    await this.selectDropdownOption('Employment Status', empStatus);
    
    const joinDateInput = this.getFormFieldGroup('Joined Date').locator('input');
    await this.fill(joinDateInput, joinDate);
  }

  public async addSalaryRecord(salaryComponent: string, amount: string): Promise<void> {
    logger.info('PIMPage: Adding salary record');
    const addButton = this.page.locator('button:has-text("Add")').first();
    await this.click(addButton);
    
    await this.fillFieldByLabel('Salary Component', salaryComponent);
    await this.fillFieldByLabel('Amount', amount);
    
    // Save salary details form
    const saveBtn = this.page.locator('.orangehrm-card-container button[type="submit"]').first();
    await this.click(saveBtn);
  }

  public async addEmergencyContact(name: string, relationship: string, telephone: string): Promise<void> {
    logger.info('PIMPage: Adding emergency contact');
    const addButton = this.page.locator('button:has-text("Add")').first();
    await this.click(addButton);
    
    await this.fillFieldByLabel('Name', name);
    await this.fillFieldByLabel('Relationship', relationship);
    await this.fillFieldByLabel('Home Telephone', telephone);
    
    const saveBtn = this.page.locator('.orangehrm-card-container button[type="submit"]').first();
    await this.click(saveBtn);
  }

  public async addDependent(name: string, relationship: string, dob: string): Promise<void> {
    logger.info('PIMPage: Adding dependent');
    const addButton = this.page.locator('button:has-text("Add")').first();
    await this.click(addButton);
    
    await this.fillFieldByLabel('Name', name);
    await this.selectDropdownOption('Relationship', relationship);
    
    const dobInput = this.getFormFieldGroup('Date of Birth').locator('input');
    await this.fill(dobInput, dob);
    
    const saveBtn = this.page.locator('.orangehrm-card-container button[type="submit"]').first();
    await this.click(saveBtn);
  }

  public async addImmigrationRecord(passportNo: string, issueDate: string, expiryDate: string): Promise<void> {
    logger.info('PIMPage: Adding immigration record');
    const addButton = this.page.locator('button:has-text("Add")').first();
    await this.click(addButton);
    
    // Choose passport radio button
    await this.page.locator('label:has-text("Passport")').click();
    await this.fillFieldByLabel('Number', passportNo);
    
    const issueDateInput = this.getFormFieldGroup('Issued Date').locator('input');
    await this.fill(issueDateInput, issueDate);
    const expiryDateInput = this.getFormFieldGroup('Expiry Date').locator('input');
    await this.fill(expiryDateInput, expiryDate);
    
    const saveBtn = this.page.locator('.orangehrm-card-container button[type="submit"]').first();
    await this.click(saveBtn);
  }

  public async uploadAttachment(filePath: string, comment?: string): Promise<void> {
    logger.info('PIMPage: Uploading attachment');
    const addButton = this.page.locator('button:has-text("Add")').last();
    await this.click(addButton);
    
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
    if (comment) {
      await this.fillTextareaByLabel('Comment', comment);
    }
    
    const saveBtn = this.page.locator('.orangehrm-card-container button[type="submit"]').first();
    await this.click(saveBtn);
  }

  // --- Employee List Page Actions ---

  public async filterEmployeeList(nameHint?: string, id?: string, empStatus?: string, include: string = 'Current Employees Only'): Promise<void> {
    logger.info(`PIMPage: Filtering employee list: name=${nameHint}, id=${id}, status=${empStatus}, include=${include}`);
    if (nameHint) {
      // Type first suggestion autocomplete
      await this.selectAutocompleteFirstSuggestion('Employee Name', nameHint);
    }
    if (id) {
      const idInput = this.getFormFieldGroup('Employee Id').locator('input');
      await this.fill(idInput, id);
    }
    if (empStatus) {
      await this.selectDropdownOption('Employment Status', empStatus);
    }
    if (include) {
      await this.selectDropdownOption('Include', include);
    }
    
    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  public async clickReset(): Promise<void> {
    logger.info('PIMPage: Clicking Reset button');
    await this.click(this.resetButton);
    await this.page.waitForTimeout(2000);
  }

  public async getEmployeeRowsCount(): Promise<number> {
    return this.tableCards.count();
  }

  public getEmployeeRowLocator(empIdOrName: string): Locator {
    return this.tableCards.filter({ hasText: empIdOrName });
  }

  public async deleteEmployee(empIdOrName: string): Promise<void> {
    logger.info(`PIMPage: Deleting employee "${empIdOrName}"`);
    const row = this.getEmployeeRowLocator(empIdOrName);
    await this.waitForVisible(row, 15000);
    
    const trashBtn = row.locator('.bi-trash');
    await this.waitForVisible(trashBtn, 10000);
    await this.click(trashBtn);
    
    await this.waitForVisible(this.yesDeleteButton, 10000);
    await this.click(this.yesDeleteButton);
  }

  public async bulkDeleteAllVisibleEmployees(): Promise<void> {
    logger.info('PIMPage: Bulk deleting all visible employees');
    await this.waitForVisible(this.selectAllCheckbox, 15000);
    await this.click(this.selectAllCheckbox);
    
    await this.waitForVisible(this.deleteSelectedButton, 15000);
    await this.click(this.deleteSelectedButton);
    
    await this.waitForVisible(this.yesDeleteButton, 10000);
    await this.click(this.yesDeleteButton);
  }

  public async sortEmployeeListByHeader(headerName: string): Promise<void> {
    logger.info(`PIMPage: Sorting Employee list by header: ${headerName}`);
    // Locate the header cell and hover over it to make the sort indicator click option visible, then click
    const headerCell = this.page.locator('.oxd-table-header-cell').filter({ hasText: headerName }).first();
    await this.waitForVisible(headerCell, 15000);
    await this.click(headerCell);
  }

  public async changePageSize(size: string): Promise<void> {
    logger.info(`PIMPage: Changing page size to ${size}`);
    // Select option from custom select pagination element
    const paginationSelector = this.page.locator('.oxd-pagination-page-size-selector');
    await this.click(paginationSelector);
    
    const sizeOption = this.page.getByRole('option', { name: size }).first();
    await this.click(sizeOption);
    await this.page.waitForTimeout(2000);
  }
}
