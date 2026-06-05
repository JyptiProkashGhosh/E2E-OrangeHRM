import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class PIMPage extends BasePage {
  // Navigation Tabs
  readonly employeeListTab: Locator;
  readonly addEmployeeTab: Locator;

  // Add Employee Form
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly fileInput: Locator;
  readonly saveButton: Locator;

  // Search Fields (Employee List)
  readonly searchEmployeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // Table & Dialogs
  readonly tableRows: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    super(page);
    
    // Top Navigation Tabs
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
    this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });

    // Form inputs (Add Employee)
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    // Find the input inside the input-group labeled "Employee Id"
    this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    // Native file input for photo upload
    this.fileInput = page.locator('input[type="file"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Search inputs (Employee List)
    this.searchEmployeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });

    // Results & Actions
    this.tableRows = page.locator('.oxd-table-card');
    // Confirm delete in the modal dialog
    this.deleteConfirmationButton = page.getByRole('button', { name: 'Yes, Delete' });
    
    // Success Toast Notification
    this.successToast = page.locator('.oxd-toast-container');
  }

  /**
   * Navigates to the Add Employee tab.
   */
  async navigateToAddEmployee(): Promise<void> {
    await this.clickElement(this.addEmployeeTab, 'Add Employee Tab');
  }

  /**
   * Navigates to the Employee List tab.
   */
  async navigateToEmployeeList(): Promise<void> {
    await this.clickElement(this.employeeListTab, 'Employee List Tab');
  }

  /**
   * Fills and submits the Add Employee form.
   */
  async addEmployee(
    firstName: string,
    lastName: string,
    middleName?: string,
    employeeId?: string,
    avatarPath?: string
  ): Promise<string> {
    await this.fillInput(this.firstNameInput, firstName, 'First Name');
    
    if (middleName) {
      await this.fillInput(this.middleNameInput, middleName, 'Middle Name');
    }
    
    await this.fillInput(this.lastNameInput, lastName, 'Last Name');

    // Retrieve or set the employee ID
    let finalEmpId = '';
    if (employeeId) {
      await this.fillInput(this.employeeIdInput, employeeId, 'Employee Id');
      finalEmpId = employeeId;
    } else {
      // Fetch the auto-generated ID if none is supplied
      const autoVal = await this.employeeIdInput.inputValue();
      finalEmpId = autoVal;
      console.log(`[Info] Using auto-generated Employee ID: ${finalEmpId}`);
    }

    // Avatar upload (if provided)
    if (avatarPath) {
      console.log(`[Action] Uploading avatar image: ${avatarPath}`);
      await this.fileInput.setInputFiles(avatarPath);
    }

    await this.clickElement(this.saveButton, 'Save Button');
    
    // Verify redirection/loading details or toast notification
    await this.page.waitForURL(/.*viewPersonalDetails.*/, { waitUntil: 'domcontentloaded' });
    console.log(`[Success] Employee ${firstName} ${lastName} created successfully!`);
    return finalEmpId;
  }

  /**
   * Searches for an employee in the list using their unique ID.
   */
  async searchEmployeeById(employeeId: string): Promise<void> {
    await this.fillInput(this.searchEmployeeIdInput, employeeId, 'Search Employee ID Input');
    await this.clickElement(this.searchButton, 'Search Button');
    // Wait for DOM content to load and let the subsequent web-first assertions do the auto-waiting
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Deletes an employee by their ID and confirms the popup.
   */
  async deleteEmployee(employeeId: string): Promise<void> {
    console.log(`[Action] Attempting to delete employee with ID: ${employeeId}`);
    
    // Find the row containing our employee ID
    const row = this.tableRows.filter({ hasText: employeeId });
    await expect(row).toBeVisible();

    // Click the delete trash icon inside that specific row
    // OrangeHRM uses classes like `.bi-trash` or `.oxd-icon-button`
    const deleteButton = row.locator('.bi-trash');
    await this.clickElement(deleteButton, `Delete Icon for Employee: ${employeeId}`);

    // Confirm deletion in the popup modal
    await this.clickElement(this.deleteConfirmationButton, 'Yes, Delete Confirmation Button');
    
    // Allow the list to refresh
    await this.page.waitForLoadState('domcontentloaded');
    console.log(`[Success] Employee with ID ${employeeId} has been successfully deleted.`);
  }

  /**
   * Asserts that a row containing the employee ID is present in the table.
   */
  async expectEmployeeInTable(employeeId: string, shouldBePresent: boolean): Promise<void> {
    const row = this.tableRows.filter({ hasText: employeeId });
    if (shouldBePresent) {
      await expect(row).toBeVisible();
    } else {
      await expect(row).not.toBeVisible();
    }
  }
}
