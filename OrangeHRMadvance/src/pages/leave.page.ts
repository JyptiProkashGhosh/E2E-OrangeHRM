import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LeavePage extends BasePage {
  // Navigation Tabs
  readonly myLeaveTab: Locator;
  readonly applyLeaveTab: Locator;
  readonly leaveListTab: Locator;
  readonly entitlementTab: Locator;

  // Apply Leave Form
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly commentsTextarea: Locator;
  readonly applyButton: Locator;
  readonly partialDayCheckbox: Locator;
  readonly partialDayDropdown: Locator;

  // Leave Balance & Entitlements
  readonly leaveBalanceTable: Locator;
  readonly leaveTypeColumn: Locator;
  readonly balanceColumn: Locator;

  // Approval/Rejection
  readonly actionDropdown: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;
  readonly rejectionReasonTextarea: Locator;
  readonly confirmButton: Locator;

  // Search & Filter
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeNameInput: Locator;
  readonly leaveStatusDropdown: Locator;

  // Results & Notifications
  readonly leaveRequestTable: Locator;
  readonly successToast: Locator;
  readonly leaveRequestRows: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation Tabs
    this.myLeaveTab = page.getByRole('link', { name: 'My Leave' });
    this.applyLeaveTab = page.getByRole('link', { name: 'Apply Leave' });
    this.leaveListTab = page.getByRole('link', { name: 'Leave List' });
    this.entitlementTab = page.getByRole('link', { name: 'Leave Entitlements' });

    // Apply Leave Form
    this.leaveTypeDropdown = page.locator('.oxd-select-text-input').first();
    this.fromDateInput = page.locator('input[placeholder="yyyy-mm-dd"]').first();
    this.toDateInput = page.locator('input[placeholder="yyyy-mm-dd"]').nth(1);
    this.commentsTextarea = page.locator('textarea');
    this.applyButton = page.getByRole('button', { name: /^Apply$/ });
    this.partialDayCheckbox = page.locator('input[type="checkbox"]');
    this.partialDayDropdown = page.locator('.oxd-select-text-input').nth(1);

    // Leave Balance Table
    this.leaveBalanceTable = page.locator('.oxd-table');
    this.leaveTypeColumn = page.locator('.oxd-table-card-cell').first();
    this.balanceColumn = page.locator('.oxd-table-card-cell').last();

    // Approval/Rejection
    this.actionDropdown = page.locator('[data-testid="leave-action-button"]');
    this.approveButton = page.getByRole('button', { name: /Approve/ });
    this.rejectButton = page.getByRole('button', { name: /Reject/ });
    this.rejectionReasonTextarea = page.locator('textarea');
    this.confirmButton = page.getByRole('button', { name: /Confirm/ });

    // Search & Filter
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.employeeNameInput = page.locator('input[placeholder*="Employee Name"]');
    this.leaveStatusDropdown = page.locator('.oxd-select-text-input').first();

    // Results & Notifications
    this.leaveRequestTable = page.locator('.oxd-table');
    this.successToast = page.locator('.oxd-toast-container');
    this.leaveRequestRows = page.locator('.oxd-table-card');
  }

  /**
   * Navigates to the Apply Leave tab.
   */
  async navigateToApplyLeave(): Promise<void> {
    await this.clickElement(this.applyLeaveTab, 'Apply Leave Tab');
    await this.waitForPageLoad();
  }

  /**
   * Navigates to My Leave tab.
   */
  async navigateToMyLeave(): Promise<void> {
    await this.clickElement(this.myLeaveTab, 'My Leave Tab');
    await this.waitForPageLoad();
  }

  /**
   * Navigates to Leave List tab (for managers/admins).
   */
  async navigateToLeaveList(): Promise<void> {
    await this.clickElement(this.leaveListTab, 'Leave List Tab');
    await this.waitForPageLoad();
  }

  /**
   * Navigates to Leave Entitlements tab.
   */
  async navigateToEntitlements(): Promise<void> {
    await this.clickElement(this.entitlementTab, 'Leave Entitlements Tab');
    await this.waitForPageLoad();
  }

  /**
   * Selects a leave type from the dropdown (e.g., 'CZL', 'Medical Leave', 'Annual Leave').
   */
  async selectLeaveType(leaveType: string): Promise<void> {
    await this.clickElement(this.leaveTypeDropdown, `Leave Type Dropdown`);
    const option = this.page.getByRole('option', { name: new RegExp(leaveType, 'i') });
    await this.clickElement(option, `Leave Type: ${leaveType}`);
  }

  /**
   * Fills the from date in YYYY-MM-DD format.
   */
  async setFromDate(date: string): Promise<void> {
    await this.fillInput(this.fromDateInput, date, `From Date: ${date}`);
  }

  /**
   * Fills the to date in YYYY-MM-DD format.
   */
  async setToDate(date: string): Promise<void> {
    await this.fillInput(this.toDateInput, date, `To Date: ${date}`);
  }

  /**
   * Adds a comment to the leave application.
   */
  async addComment(comment: string): Promise<void> {
    await this.fillInput(this.commentsTextarea, comment, `Comment: ${comment}`);
  }

  /**
   * Applies for leave with specified parameters.
   */
  async applyForLeave(
    leaveType: string,
    fromDate: string,
    toDate: string,
    comment?: string
  ): Promise<void> {
    console.log(`[Leave] Applying for leave: ${leaveType} from ${fromDate} to ${toDate}`);
    
    await this.selectLeaveType(leaveType);
    await this.setFromDate(fromDate);
    await this.setToDate(toDate);
    
    if (comment) {
      await this.addComment(comment);
    }
    
    await this.clickElement(this.applyButton, 'Apply Button');
  }

  /**
   * Applies for leave with partial day option (e.g., 'Morning', 'Afternoon').
   */
  async applyForPartialLeave(
    leaveType: string,
    date: string,
    partialOption: 'Morning' | 'Afternoon',
    comment?: string
  ): Promise<void> {
    console.log(`[Leave] Applying for partial leave: ${leaveType} on ${date} (${partialOption})`);
    
    await this.selectLeaveType(leaveType);
    await this.setFromDate(date);
    await this.setToDate(date);
    
    // Check partial day checkbox
    await this.clickElement(this.partialDayCheckbox, 'Partial Day Checkbox');
    
    // Select partial day option
    await this.clickElement(this.partialDayDropdown, 'Partial Day Dropdown');
    const option = this.page.getByRole('option', { name: new RegExp(partialOption, 'i') });
    await this.clickElement(option, `Partial Day Option: ${partialOption}`);
    
    if (comment) {
      await this.addComment(comment);
    }
    
    await this.clickElement(this.applyButton, 'Apply Button');
  }

  /**
   * Verifies that leave application was successful by checking for success toast.
   */
  async expectLeaveApplicationSuccess(): Promise<void> {
    console.log('[Leave] Verifying leave application success');
    await expect(this.successToast).toContainText(/Applied|Created|Successfully/i);
  }

  /**
   * Searches for leave requests by employee name.
   */
  async searchLeaveByEmployeeName(employeeName: string): Promise<void> {
    console.log(`[Leave] Searching for leave by employee: ${employeeName}`);
    await this.fillInput(this.employeeNameInput, employeeName, `Employee Name: ${employeeName}`);
    await this.clickElement(this.searchButton, 'Search Button');
  }

  /**
   * Filters leave requests by status (Pending, Approved, Rejected, Cancelled).
   */
  async filterLeaveByStatus(status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'): Promise<void> {
    console.log(`[Leave] Filtering leaves by status: ${status}`);
    await this.clickElement(this.leaveStatusDropdown, 'Leave Status Dropdown');
    const option = this.page.getByRole('option', { name: new RegExp(status, 'i') });
    await this.clickElement(option, `Leave Status: ${status}`);
  }

  /**
   * Resets all search/filter criteria.
   */
  async resetSearchFilters(): Promise<void> {
    console.log('[Leave] Resetting search filters');
    await this.clickElement(this.resetButton, 'Reset Button');
  }

  /**
   * Approves a leave request by finding it in the table and clicking approve.
   */
  async approveLeaveRequest(employeeName: string): Promise<void> {
    console.log(`[Leave] Approving leave for: ${employeeName}`);
    
    // Find the row for this employee
    const row = this.page.locator('.oxd-table-card').filter({ hasText: employeeName });
    await row.locator('button, [role="button"]').first().click();
    
    // Click approve action
    await this.clickElement(this.approveButton, 'Approve Button');
    await this.clickElement(this.confirmButton, 'Confirm Button');
  }

  /**
   * Rejects a leave request with optional reason.
   */
  async rejectLeaveRequest(employeeName: string, reason?: string): Promise<void> {
    console.log(`[Leave] Rejecting leave for: ${employeeName}`);
    
    // Find the row for this employee
    const row = this.page.locator('.oxd-table-card').filter({ hasText: employeeName });
    await row.locator('button, [role="button"]').first().click();
    
    // Click reject action
    await this.clickElement(this.rejectButton, 'Reject Button');
    
    if (reason) {
      await this.fillInput(this.rejectionReasonTextarea, reason, `Rejection Reason: ${reason}`);
    }
    
    await this.clickElement(this.confirmButton, 'Confirm Button');
  }

  /**
   * Retrieves leave balance for a specific leave type.
   */
  async getLeaveBalance(leaveType: string): Promise<string> {
    console.log(`[Leave] Fetching leave balance for: ${leaveType}`);
    
    const row = this.leaveBalanceTable.locator('.oxd-table-card').filter({ hasText: leaveType });
    const balanceText = await row.locator('.oxd-table-card-cell').last().textContent();
    
    return balanceText?.trim() || '0';
  }

  /**
   * Verifies that leave request appears in the table.
   */
  async expectLeaveRequestInTable(employeeName: string, shouldExist = true): Promise<void> {
    const row = this.page.locator('.oxd-table-card').filter({ hasText: employeeName });
    
    if (shouldExist) {
      console.log(`[Leave] Verifying leave request for ${employeeName} exists`);
      await expect(row).toBeVisible();
    } else {
      console.log(`[Leave] Verifying leave request for ${employeeName} does not exist`);
      await expect(row).not.toBeVisible();
    }
  }

  /**
   * Verifies that leave balance meets expected criteria.
   */
  async expectLeaveBalanceGreaterThan(leaveType: string, minBalance: number): Promise<void> {
    const balance = await this.getLeaveBalance(leaveType);
    const numBalance = parseFloat(balance);
    
    console.log(`[Leave] Verifying ${leaveType} balance (${numBalance}) >= ${minBalance}`);
    expect(numBalance).toBeGreaterThanOrEqual(minBalance);
  }

  /**
   * Gets the count of pending leave requests.
   */
  async getPendingLeaveCount(): Promise<number> {
    console.log('[Leave] Counting pending leave requests');
    await this.filterLeaveByStatus('Pending');
    const count = await this.leaveRequestRows.count();
    return count;
  }
}
