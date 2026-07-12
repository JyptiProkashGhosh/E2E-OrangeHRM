import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';
import * as fs from 'fs';
import * as path from 'path';

test.describe('OrangeHRM Admin Module @admin', () => {
  let dummyDocPath: string;

  test.beforeAll(async () => {
    // Generate temporary files for testing uploads
    dummyDocPath = path.join(__dirname, `dummy_spec_${Date.now()}.pdf`);
    fs.writeFileSync(dummyDocPath, 'fake job specification content');
    logger.info(`Generated temporary files at: ${dummyDocPath}`);
  });

  test.afterAll(async () => {
    // Clean up temporary files
    if (fs.existsSync(dummyDocPath)) {
      fs.unlinkSync(dummyDocPath);
    }
    logger.info('Cleaned up temporary test files.');
  });

  test.beforeEach(async ({ authenticatedPage, pageFactory }) => {
    const sidebar = pageFactory.getSidebarComponent();
    await sidebar.clickAdmin();
  });

  test('AD1: Add a new System User linked to an existing employee @smoke @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToUserManagement();
    await adminPage.clickAdd();

    const uniqueUsername = `user_${Date.now()}`;
    const password = 'SecurePassword123!';

    // We type 'm' to trigger employee suggestions and choose the first one
    const resolvedEmployeeName = await adminPage.fillAddUserForm('Admin', 'm', 'Enabled', uniqueUsername, password);
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Verify user row exists in user list
    await adminPage.searchUsersTable(uniqueUsername);
    const row = adminPage.getUserRowLocator(uniqueUsername);
    await expect(row).toBeVisible({ timeout: 20000 });
    logger.info(`AD1: Successfully created system user "${uniqueUsername}" linked to "${resolvedEmployeeName}"`);
  });

  test('AD2: Search Users by multiple filters @regression', async ({ pageFactory }) => {
    test.setTimeout(60000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToUserManagement();

    // Search for seeded 'Admin' user by username and role
    await adminPage.searchUsersTable('Admin', 'Admin');
    const row = adminPage.getUserRowLocator('Admin');
    await expect(row).toBeVisible({ timeout: 20000 });
    logger.info('AD2: Successfully filtered user management list by username & role.');
  });

  test('AD3: Edit user role and status @regression', async ({ pageFactory }) => {
    test.setTimeout(120000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToUserManagement();
    
    // Create unique user to edit
    await adminPage.clickAdd();
    const tempUsername = `edit_${Date.now()}`;
    const password = 'SecurePassword123!';
    await adminPage.fillAddUserForm('Admin', 'm', 'Enabled', tempUsername, password);
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Search and edit
    await adminPage.clickReset();
    await adminPage.searchUsersTable(tempUsername);
    
    const row = adminPage.getUserRowLocator(tempUsername);
    await adminPage.click(row.locator('.bi-pencil-fill'));
    
    // Modify User Role and Status
    await adminPage.selectDropdownOption('User Role', 'ESS');
    await adminPage.selectDropdownOption('Status', 'Disabled');
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Verify persistence
    await adminPage.clickReset();
    await adminPage.searchUsersTable(tempUsername);
    
    // Verify row shows ESS and Disabled
    await expect(row).toContainText('ESS', { timeout: 20000 });
    await expect(row).toContainText('Disabled', { timeout: 20000 });
    logger.info(`AD3: Successfully edited user "${tempUsername}" role to ESS and status to Disabled.`);
  });

  test('AD4: Delete a user @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToUserManagement();

    // Create a temp user to delete
    await adminPage.clickAdd();
    const tempUsername = `del_${Date.now()}`;
    const password = 'SecurePassword123!';
    await adminPage.fillAddUserForm('Admin', 'm', 'Enabled', tempUsername, password);
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Search, Delete, and Verify
    await adminPage.clickReset();
    await adminPage.searchUsersTable(tempUsername);
    await adminPage.deleteUserFromTable(tempUsername);
    await adminPage.expectSuccessToast();

    await adminPage.clickReset();
    await adminPage.searchUsersTable(tempUsername);
    const row = adminPage.getUserRowLocator(tempUsername);
    await expect(row).toBeHidden({ timeout: 20000 });
    logger.info(`AD4: Successfully deleted user "${tempUsername}"`);
  });

  test('AD5: Negative - Add User with duplicate username @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToUserManagement();

    // Try to create user with existing name 'Admin'
    await adminPage.clickAdd();
    await adminPage.fillFieldByLabel('Username', 'Admin');
    // Trigger blur validation by selecting Role
    await adminPage.selectDropdownOption('User Role', 'Admin');
    
    // Assert inline duplicate validation
    const errorText = await adminPage.getFieldErrorText('Username');
    expect(errorText).toBe('Already exists');
    logger.info('AD5: Verified duplicate username validation message.');
  });

  test('AD7: Job Titles - Add and Delete a Job Title @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToJobTitles();
    await adminPage.clickAdd();

    const uniqueJobTitle = `QA Lead ${Date.now()}`;
    await adminPage.fillJobTitleForm(uniqueJobTitle, 'Job Description', 'Note', dummyDocPath);
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Verify in list
    const exists = await adminPage.isJobTitleInList(uniqueJobTitle);
    expect(exists).toBe(true);

    // Delete Job Title
    await adminPage.deleteJobTitle(uniqueJobTitle);
    await adminPage.expectSuccessToast();
    
    // Verify removal
    const deletedExists = await adminPage.isJobTitleInList(uniqueJobTitle);
    expect(deletedExists).toBe(false);
    logger.info(`AD7: Job Title "${uniqueJobTitle}" added and deleted successfully.`);
  });

  test('AD13: Locations - Add and Delete a Location record @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const adminPage = pageFactory.getAdminPage();
    await adminPage.navigateToLocations();
    await adminPage.clickAdd();

    const locationName = `Location_${Date.now()}`;
    await adminPage.fillLocationForm(locationName, 'United States', 'Austin');
    await adminPage.clickSave();
    await adminPage.expectSuccessToast();

    // Search and verify presence
    await adminPage.searchLocationsTable(locationName);
    const row = adminPage.getLocationRowLocator(locationName);
    await expect(row).toBeVisible({ timeout: 20000 });

    // Delete Location
    await adminPage.deleteLocation(locationName);
    await adminPage.expectSuccessToast();

    // Verify removal
    await adminPage.clickReset();
    await adminPage.searchLocationsTable(locationName);
    await expect(row).toBeHidden({ timeout: 20000 });
    logger.info(`AD13: Location "${locationName}" added and deleted successfully.`);
  });
});
