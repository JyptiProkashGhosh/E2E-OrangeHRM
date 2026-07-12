import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LeavePage extends BasePage {
  // Navigation tabs
  private readonly applyTabLink: Locator;
  private readonly myLeaveTabLink: Locator;
  private readonly leaveListTabLink: Locator;
  private readonly assignLeaveTabLink: Locator;

  // Form buttons
  private readonly submitButton: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;

  // Leave Status checkboxes in Leave List filter
  private readonly pendingStatusCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    this.applyTabLink = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("Apply")');
    this.myLeaveTabLink = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("My Leave")');
    this.leaveListTabLink = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("Leave List")');
    this.assignLeaveTabLink = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("Assign Leave")');

    this.submitButton = this.page.locator('button[type="submit"]');
    this.searchButton = this.page.locator('button[type="submit"]');
    this.resetButton = this.page.locator('button:has-text("Reset")');
    
    // Checkbox container for 'Pending Approval' status in filters
    this.pendingStatusCheckbox = this.page.locator('.oxd-checkbox-wrapper').filter({ hasText: 'Pending Approval' }).locator('.oxd-checkbox-input');
  }

  // --- Tab Navigation ---

  public async navigateToApplyLeave(): Promise<void> {
    logger.info('LeavePage: Navigating to Apply Leave');
    await this.waitForVisible(this.applyTabLink, 15000);
    await this.click(this.applyTabLink);
  }

  public async navigateToMyLeave(): Promise<void> {
    logger.info('LeavePage: Navigating to My Leave');
    await this.waitForVisible(this.myLeaveTabLink, 15000);
    await this.click(this.myLeaveTabLink);
  }

  public async navigateToLeaveList(): Promise<void> {
    logger.info('LeavePage: Navigating to Leave List');
    await this.waitForVisible(this.leaveListTabLink, 15000);
    await this.click(this.leaveListTabLink);
  }

  public async navigateToAssignLeave(): Promise<void> {
    logger.info('LeavePage: Navigating to Assign Leave');
    await this.waitForVisible(this.assignLeaveTabLink, 15000);
    await this.click(this.assignLeaveTabLink);
  }

  // --- Actions ---

  /**
   * Clicks Leave Type dropdown and selects the first available non-placeholder option.
   */
  public async selectFirstAvailableLeaveType(): Promise<string> {
    const group = this.getFormFieldGroup('Leave Type');
    const dropdownTrigger = group.locator('.oxd-select-text');
    await this.waitForVisible(dropdownTrigger, 15000);
    await this.click(dropdownTrigger);

    // Wait for option suggestions to hydrate and pick index 1 (the first option after 'Select')
    const optionElement = this.page.locator('.oxd-select-option').nth(1);
    await this.waitForVisible(optionElement, 15000);
    const chosenText = await this.getText(optionElement);
    logger.info(`LeavePage: Dynamically selected Leave Type: "${chosenText}"`);
    await this.click(optionElement);
    return chosenText;
  }

  /**
   * Apply for leave.
   */
  public async applyLeave(leaveType: string, fromDate: string, toDate: string, comment?: string): Promise<void> {
    logger.info(`LeavePage: Applying leave: type=${leaveType}, from=${fromDate}, to=${toDate}`);
    await this.selectDropdownOption('Leave Type', leaveType);
    
    // We wait for balance / input validation to load
    await this.page.waitForTimeout(1500);

    // Use robust fillDateInput to completely clear the field before entering value
    await this.fillDateInput('From Date', fromDate);
    await this.fillDateInput('To Date', toDate);

    if (comment) {
      await this.fillTextareaByLabel('Comments', comment);
    }

    await this.click(this.submitButton);
  }

  public async filterMyLeaveList(fromDate: string, toDate: string): Promise<void> {
    logger.info(`LeavePage: Filtering My Leave: from=${fromDate}, to=${toDate}`);
    await this.fillDateInput('From Date', fromDate);
    await this.fillDateInput('To Date', toDate);

    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  public async filterLeaveList(employeeNameHint: string, leaveType?: string, fromDate?: string, toDate?: string): Promise<void> {
    logger.info(`LeavePage: Filtering Leave List: employee=${employeeNameHint}, type=${leaveType}`);
    
    // Clear default status chips (like 'Pending Approval') to show all statuses
    const closeIcons = this.page.locator('.oxd-chip-icon, .oxd-icon-close, .oxd-chip .oxd-icon, .oxd-chip i');
    try {
      // Wait a brief moment for status chips to render
      await closeIcons.first().waitFor({ state: 'visible', timeout: 3000 });
      const count = await closeIcons.count();
      for (let i = 0; i < count; i++) {
        await this.click(closeIcons.first());
        await this.page.waitForTimeout(300);
      }
    } catch (e) {
      // No chips visible to clear
    }

    await this.selectAutocompleteFirstSuggestion('Employee Name', employeeNameHint);
    
    if (leaveType) {
      await this.selectDropdownOption('Leave Type', leaveType);
    }

    if (fromDate && toDate) {
      await this.fillDateInput('From Date', fromDate);
      await this.fillDateInput('To Date', toDate);
    }
    
    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  public async assignLeave(employeeNameHint: string, leaveType: string, fromDate: string, toDate: string): Promise<string> {
    logger.info(`LeavePage: Assigning leave to employee hint: ${employeeNameHint}`);
    const resolvedName = await this.selectAutocompleteFirstSuggestion('Employee Name', employeeNameHint);
    await this.selectDropdownOption('Leave Type', leaveType);

    await this.page.waitForTimeout(1500);

    await this.fillDateInput('From Date', fromDate);
    await this.fillDateInput('To Date', toDate);

    // Save and handle confirmation popups
    const saveBtn = this.page.locator('button[type="submit"], button:has-text("Assign")').first();
    await this.click(saveBtn);
    
    const okBtn = this.page.locator('.oxd-dialog-container-default button:has-text("Ok"), .oxd-dialog-container-default button:has-text("Yes")').first();
    try {
      await okBtn.waitFor({ state: 'visible', timeout: 5000 });
      logger.info('LeavePage: Confirmation modal detected, clicking OK');
      await okBtn.click();
    } catch (e) {
      logger.info('LeavePage: No confirmation modal appeared');
    }

    return resolvedName;
  }

  /**
   * Navigates to Add Entitlements and selects/returns the first available leave type.
   */
  public async selectFirstAvailableLeaveTypeFromEntitlements(): Promise<string> {
    logger.info('LeavePage: Selecting first available Leave Type from Entitlements page');
    const entitlementsMenu = this.page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Entitlements' }).first();
    await this.waitForVisible(entitlementsMenu, 15000);
    await this.click(entitlementsMenu);

    const addEntitlementsItem = this.page.getByRole('menuitem', { name: 'Add Entitlements' });
    await this.waitForVisible(addEntitlementsItem, 10000);
    await this.click(addEntitlementsItem);

    await this.page.waitForTimeout(1000);

    const leaveType = await this.selectFirstAvailableDropdownOption('Leave Type');
    return leaveType;
  }

  /**
   * Adds leave entitlement to a specific employee for a leave type.
   */
  public async addLeaveEntitlement(employeeName: string, leaveType: string, entitlement: string): Promise<void> {
    logger.info(`LeavePage: Adding ${entitlement} days entitlement for ${employeeName} (${leaveType})`);
    
    const entitlementsMenu = this.page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Entitlements' }).first();
    await this.waitForVisible(entitlementsMenu, 15000);
    await this.click(entitlementsMenu);

    const addEntitlementsItem = this.page.getByRole('menuitem', { name: 'Add Entitlements' });
    await this.waitForVisible(addEntitlementsItem, 10000);
    await this.click(addEntitlementsItem);

    await this.page.waitForTimeout(1000);

    await this.selectAutocompleteFirstSuggestion('Employee Name', employeeName);
    await this.selectDropdownOption('Leave Type', leaveType);
    await this.fillFieldByLabel('Entitlement', entitlement);

    await this.click(this.submitButton);

    // Click Confirm in dialog popup if it appears
    const confirmBtn = this.page.locator('.oxd-dialog-container-default button:has-text("Confirm")').first();
    try {
      await confirmBtn.waitFor({ state: 'visible', timeout: 4000 });
      await this.click(confirmBtn);
    } catch (e) {
      // Dialog didn't show, that's fine
    }

    await this.expectSuccessToast();
  }

  public getLeaveRowLocator(info: string): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-card').filter({ hasText: info }).first();
  }

  public async approveLeaveRequest(info: string): Promise<void> {
    logger.info(`LeavePage: Approving leave request for "${info}"`);
    const row = this.getLeaveRowLocator(info);
    await this.waitForVisible(row, 15000);
    const approveBtn = row.getByRole('button', { name: 'Approve' }).first();
    await this.click(approveBtn);
  }

  public async rejectLeaveRequest(info: string): Promise<void> {
    logger.info(`LeavePage: Rejecting leave request for "${info}"`);
    const row = this.getLeaveRowLocator(info);
    await this.waitForVisible(row, 15000);
    const rejectBtn = row.getByRole('button', { name: 'Reject' }).first();
    await this.click(rejectBtn);
  }

  public async cancelLeaveRequest(info: string): Promise<void> {
    logger.info(`LeavePage: Cancelling leave request for "${info}"`);
    const row = this.getLeaveRowLocator(info);
    await this.waitForVisible(row, 15000);
    const cancelBtn = row.getByRole('button', { name: 'Cancel' }).first();
    await this.click(cancelBtn);
  }
}
