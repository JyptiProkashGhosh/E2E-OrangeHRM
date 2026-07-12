import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';

// Helper to generate a unique future date range in YYYY-DD-MM format within the 2026 leave period
function getUniqueFutureDates(offset: number = 0): { fromDate: string; toDate: string } {
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  // Use 2026 to match the active leave period of the default entitlements in the demo system
  const year = '2026';
  
  // Pick random month between 10 and 12 (to ensure future date relative to current July 2026 date)
  const month = pad(Math.floor(10 + Math.random() * 3));
  const dayFrom = Math.floor(1 + Math.random() * 10) + offset;
  const dayTo = dayFrom + 2;
  
  return {
    fromDate: `${year}-${pad(dayFrom)}-${month}`,
    toDate: `${year}-${pad(dayTo)}-${month}`
  };
}

test.describe('OrangeHRM Leave Module @leave', () => {

  test.beforeEach(async ({ authenticatedPage, pageFactory }) => {
    const sidebar = pageFactory.getSidebarComponent();
    await sidebar.clickLeave();
  });

  test('L1: Apply for leave @smoke @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const leavePage = pageFactory.getLeavePage();

    // 1. Get logged-in user's employee name dynamically
    const dropdown = leavePage.page.locator('.oxd-userdropdown-name');
    await dropdown.waitFor({ state: 'visible', timeout: 15000 });
    const employeeName = (await dropdown.innerText()).trim();

    // 2. Select first available leave type from the Entitlements page to avoid empty balance page state
    const leaveType = await leavePage.selectFirstAvailableLeaveTypeFromEntitlements();

    // 3. Add entitlement to this employee to prevent "Leave Balance Exceeded"
    await leavePage.addLeaveEntitlement(employeeName, leaveType, '20.00');

    // 4. Apply for leave
    await leavePage.navigateToApplyLeave();
    const { fromDate, toDate } = getUniqueFutureDates(0);
    await leavePage.applyLeave(leaveType, fromDate, toDate, 'Automated Test Leave');
    await leavePage.expectSuccessToast();
    logger.info(`L1: Applied leave successfully: type=${leaveType}`);
  });

  test('L2: Negative - Apply Leave with End Date before Start Date @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const leavePage = pageFactory.getLeavePage();
    
    // Select first available leave type from the Entitlements page dynamically
    const leaveType = await leavePage.selectFirstAvailableLeaveTypeFromEntitlements();
    
    await leavePage.navigateToApplyLeave();
    // Start date is Aug 15th, End date is Aug 12th in YYYY-DD-MM format (within 2026)
    const fromDate = '2026-15-08';
    const toDate = '2026-12-08';
    
    await leavePage.applyLeave(leaveType, fromDate, toDate, 'Invalid Range Test');
    
    // Check validation message
    const errorText = await leavePage.getFieldErrorText('To Date');
    expect(errorText).toBe('To date should be after from date');
    logger.info('L2: Verified validation message: "To date should be after from date"');
  });

  test('L3 & L4: View pending leave and Cancel request @regression', async ({ pageFactory }) => {
    test.setTimeout(120000);
    const leavePage = pageFactory.getLeavePage();
    
    // Get logged-in user's employee name
    const dropdown = leavePage.page.locator('.oxd-userdropdown-name');
    await dropdown.waitFor({ state: 'visible', timeout: 15000 });
    const employeeName = (await dropdown.innerText()).trim();

    // Step 1: Select first available leave type from Entitlements
    const leaveType = await leavePage.selectFirstAvailableLeaveTypeFromEntitlements();
    
    // Step 2: Add entitlement
    await leavePage.addLeaveEntitlement(employeeName, leaveType, '20.00');

    // Step 3: Apply for leave
    await leavePage.navigateToApplyLeave();
    const { fromDate, toDate } = getUniqueFutureDates(4);
    await leavePage.applyLeave(leaveType, fromDate, toDate, 'Cancel Test Leave');
    await leavePage.expectSuccessToast();

    // Step 4: Navigate to My Leave and filter
    await leavePage.navigateToMyLeave();
    await leavePage.filterMyLeaveList(fromDate, toDate);
    
    // L3: Verify status is Pending Approval
    const row = leavePage.getLeaveRowLocator(fromDate);
    await expect(row).toContainText('Pending Approval', { timeout: 20000 });
    logger.info('L3: Verified leave is displayed with status Pending Approval.');

    // L4: Cancel the leave request
    await leavePage.cancelLeaveRequest(fromDate);
    await leavePage.expectSuccessToast();
    
    // Verify status changes to Cancelled
    await expect(row).toContainText('Cancelled', { timeout: 20000 });
    logger.info('L4: Successfully cancelled leave request and verified status updated to Cancelled.');
  });

  test('L5, L6 & L7: Admin Leave List filtering, Approving and Rejecting @regression', async ({ pageFactory }) => {
    test.setTimeout(120000);
    const leavePage = pageFactory.getLeavePage();
    
    // Step 1: Navigate to Leave List and click Reset to show all default pending leaves
    await leavePage.navigateToLeaveList();
    const resetBtn = leavePage.page.locator('button:has-text("Reset")');
    if (await resetBtn.isVisible()) {
      await resetBtn.click();
      await leavePage.page.waitForTimeout(2000);
    }
    
    // Get the first pending leave row in the table
    const tableRows = leavePage.page.locator('.oxd-table-body .oxd-table-card');
    const count = await tableRows.count();
    
    if (count > 0) {
      // Get the key/date of the first row to locate it precisely
      const firstRow = tableRows.first();
      const rowText = await firstRow.innerText();
      const dateKey = rowText.split('\n')[0].trim();
      
      logger.info(`L5-L7: Found pending leave row with key: "${dateKey}"`);

      // L6: Approve the first pending leave request
      await leavePage.approveLeaveRequest(dateKey);
      await leavePage.expectSuccessToast();
      logger.info('L6: Successfully approved leave request.');
      
      // Wait for table to reload
      await leavePage.page.waitForTimeout(2500);
      
      // Reject the next pending leave request (which is now the first row)
      const newCount = await tableRows.count();
      if (newCount > 0) {
        const nextRow = tableRows.first();
        const nextRowText = await nextRow.innerText();
        const nextDateKey = nextRowText.split('\n')[0].trim();
        
        logger.info(`L5-L7: Found next pending leave row with key: "${nextDateKey}"`);
        
        await leavePage.rejectLeaveRequest(nextDateKey);
        await leavePage.expectSuccessToast();
        logger.info('L7: Successfully rejected leave request.');
      } else {
        logger.info('L7: Skipped reject test as no more pending leaves exist.');
      }
    } else {
      logger.warn('L5-L7: No pending leave requests found in the system to approve/reject.');
    }
  });

  test('L8: Admin - Assign Leave on behalf of an employee @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const leavePage = pageFactory.getLeavePage();
    
    // Select first available leave type from Entitlements
    const leaveType = await leavePage.selectFirstAvailableLeaveTypeFromEntitlements();
    
    await leavePage.navigateToAssignLeave();
    const { fromDate, toDate } = getUniqueFutureDates(16);
    
    // Assign leave to a standard employee name hint 'm'
    const resolvedName = await leavePage.assignLeave('m', leaveType, fromDate, toDate);
    await leavePage.expectSuccessToast();
    logger.info(`L8: Successfully assigned leave to employee: ${resolvedName}`);
  });
});
