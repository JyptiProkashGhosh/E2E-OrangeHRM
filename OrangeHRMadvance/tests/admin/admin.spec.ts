import { test, expect } from '../../src/fixtures/auth.fixture';
import { Helpers } from '../../src/utils/helpers';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Admin Module - User, Job, and Organization Management', () => {
  // Run tests in this file sequentially to avoid concurrency conflicts on shared state/files
  test.describe.configure({ mode: 'serial' });

  let employeeId: string;
  let employeeFirstName: string;
  let employeeLastName: string;
  let testUsername: string;
  let testJobTitle: string;
  let validSpecPath: string;
  let largeSpecPath: string;
  let originalOrgName: string;

  test.beforeAll(async () => {
    // Ensure test-data directory exists
    const testDataDir = path.join(process.cwd(), 'test-data');
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    // Create a valid small file (10 KB) for job spec
    validSpecPath = path.join(testDataDir, 'valid_spec.pdf');
    fs.writeFileSync(validSpecPath, Buffer.alloc(10 * 1024));

    // Create a large file (1.2 MB) for boundary testing (exceeding 1MB limit)
    largeSpecPath = path.join(testDataDir, 'large_spec.pdf');
    fs.writeFileSync(largeSpecPath, Buffer.alloc(1.2 * 1024 * 1024));
  });

  test.afterAll(async () => {
    // Clean up local generated test files
    for (const filePath of [validSpecPath, largeSpecPath]) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[Teardown] Deleted local dummy file: ${filePath}`);
      }
    }
  });

  test.beforeEach(async ({ dashboardPage }) => {
    // Generate fresh dynamic names for every test case to ensure isolation
    employeeFirstName = 'AdminEmp_' + Helpers.getRandomString(6);
    employeeLastName = 'Test_' + Helpers.getRandomString(6);
    testUsername = 'user_' + Helpers.getRandomString(6);
    testJobTitle = 'QA_Title_' + Helpers.getRandomString(6);

    // Navigate to dashboard before each test to utilize session cookies
    await dashboardPage.navigate('/web/index.php/dashboard/index');
  });

  test.describe('User Management Lifecycle', () => {
    test.beforeEach(async ({ dashboardPage, pimPage }) => {
      // Create a dynamic employee first to link the user to, ensuring isolation
      await dashboardPage.clickPIM();
      await pimPage.navigateToAddEmployee();
      employeeId = await pimPage.addEmployee(employeeFirstName, employeeLastName);
    });

    test('Should create, search, and delete a new Admin user @admin @smoke', async ({
      dashboardPage,
      adminPage
    }) => {
      // Navigate to Admin module
      await dashboardPage.clickAdmin();
      await dashboardPage.expectHeaderTitle('Admin');

      // Click Add User
      await adminPage.navigateToAddUser();

      // Fill form and save (link to the newly created employee)
      const fullName = `${employeeFirstName} ${employeeLastName}`;
      await adminPage.addUser(
        'Admin',
        fullName,
        'Enabled',
        testUsername,
        'SecurePassword123!'
      );

      // Search for the created user
      await adminPage.searchUserByUsername(testUsername);

      // Verify user is in table
      await adminPage.expectUserInTable(testUsername, true);

      // Delete the user
      await adminPage.deleteUser(testUsername);

      // Search again and verify deleted user is not present
      await adminPage.searchUserByUsername(testUsername);
      await adminPage.expectUserInTable(testUsername, false);
    });

    test('Should display validation error when username is less than 5 characters @admin @boundary', async ({
      dashboardPage,
      adminPage
    }) => {
      await dashboardPage.clickAdmin();
      await adminPage.navigateToAddUser();

      // Enter a 3-character username
      const invalidUsername = 'abc';
      const fullName = `${employeeFirstName} ${employeeLastName}`;

      // Fill form without saving to see immediate validation error
      const roleDropdown = adminPage.page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
      await adminPage.clickElement(roleDropdown, 'User Role Dropdown');
      await adminPage.page.getByRole('option', { name: 'Admin', exact: true }).click();

      const employeeInput = adminPage.page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
      await adminPage.fillInput(employeeInput, fullName, 'Employee Name Input');
      const option = adminPage.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').filter({ hasText: fullName }).first();
      await option.waitFor({ state: 'visible', timeout: 15000 });
      await option.click();

      const usernameInput = adminPage.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
      await adminPage.fillInput(usernameInput, invalidUsername, 'Username Input');

      // Assert error message
      await adminPage.expectUsernameLengthError('Should be at least 5 characters');
    });
  });

  test.describe('Job Title Management', () => {
    test('Should add, verify, and delete a Job Title with specification @admin @job', async ({
      dashboardPage,
      adminPage
    }) => {
      await dashboardPage.clickAdmin();
      await adminPage.navigateToJobTitles();

      // Add new Job Title
      await adminPage.addJobTitle(testJobTitle, 'Job description text', validSpecPath);

      // Verify it exists in table
      await adminPage.expectJobTitleInTable(testJobTitle, true);

      // Delete the Job Title
      await adminPage.deleteJobTitle(testJobTitle);

      // Verify it is removed
      await adminPage.expectJobTitleInTable(testJobTitle, false);
    });

    test('Should show validation error when Job Specification exceeds 1MB @admin @boundary', async ({
      dashboardPage,
      adminPage
    }) => {
      await dashboardPage.clickAdmin();
      await adminPage.navigateToJobTitles();

      // Attempt to add Job Title with large file
      await adminPage.addJobTitle('QA_Large_File_Test', 'This should fail saving', largeSpecPath);

      // Verify size error message
      await adminPage.expectJobSpecSizeError('Attachment Size Exceeded');
    });
  });

  test.describe('Organization General Information', () => {
    test('Should update Organization Name and persist changes @admin @organization', async ({
      dashboardPage,
      adminPage
    }) => {
      await dashboardPage.clickAdmin();
      await adminPage.navigateToGeneralInformation();

      // Change name and capture original name to restore
      const newOrgName = 'OrangeHRM Enterprise Global ' + Helpers.getRandomString(4);
      originalOrgName = await adminPage.updateOrganizationName(newOrgName);

      console.log("[DEBUG] Current URL:", adminPage.page.url());
      const validationMsgs = await adminPage.page.locator('.oxd-input-group__message').allTextContents();
      console.log("[DEBUG] Validation messages:", validationMsgs);
      const toastMsgs = await adminPage.page.locator('.oxd-toast').allTextContents();
      console.log("[DEBUG] Toast messages:", toastMsgs);
      const inputVal = await adminPage.page.locator('.oxd-input-group').filter({ hasText: 'Organization Name' }).locator('input').inputValue();
      console.log("[DEBUG] Organization Name input value:", inputVal);

      // Verify updated name
      await adminPage.expectOrganizationName(newOrgName);

      // Restore original name to prevent side effects
      await adminPage.navigateToGeneralInformation();
      await adminPage.updateOrganizationName(originalOrgName);
      await adminPage.expectOrganizationName(originalOrgName);
    });
  });
});
