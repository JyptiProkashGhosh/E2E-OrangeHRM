import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';
import * as fs from 'fs';
import * as path from 'path';

test.describe('OrangeHRM PIM Module @pim', () => {
  let dummyPhotoPath: string;
  let dummyDocPath: string;

  test.beforeAll(async () => {
    // Generate temporary files for testing uploads
    // Use a real valid 1x1 pixel PNG to bypass backend image file validation
    dummyPhotoPath = path.join(__dirname, `dummy_pic_${Date.now()}.png`);
    const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    fs.writeFileSync(dummyPhotoPath, Buffer.from(tinyPngBase64, 'base64'));

    dummyDocPath = path.join(__dirname, `dummy_doc_${Date.now()}.pdf`);
    fs.writeFileSync(dummyDocPath, 'fake document content');

    logger.info(`Generated temporary files at: ${dummyPhotoPath} and ${dummyDocPath}`);
  });

  test.afterAll(async () => {
    // Clean up temporary files
    if (fs.existsSync(dummyPhotoPath)) {
      fs.unlinkSync(dummyPhotoPath);
    }
    if (fs.existsSync(dummyDocPath)) {
      fs.unlinkSync(dummyDocPath);
    }
    logger.info('Cleaned up temporary test files.');
  });

  test.beforeEach(async ({ authenticatedPage, pageFactory }) => {
    const sidebar = pageFactory.getSidebarComponent();
    await sidebar.clickPim();
  });

  test('P1a: Add a new employee with only mandatory fields @smoke @regression', async ({ pageFactory, authenticatedPage }) => {
    test.setTimeout(90000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `EmpFirst_${Date.now()}`;
    const lastName = `EmpLast_${Date.now()}`;
    
    // Fill fields and get auto-generated ID
    const empId = await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    // Verify redirect to details
    await expect(authenticatedPage).toHaveURL(/.*\/pim\/viewPersonalDetails/, { timeout: 30000 });
    logger.info(`P1a: Successfully created employee with ID ${empId}`);
  });

  test('P1b: Add a new employee with login details enabled @smoke @regression', async ({ pageFactory, authenticatedPage }) => {
    test.setTimeout(90000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `LoginFirst_${Date.now()}`;
    const lastName = `LoginLast_${Date.now()}`;
    const username = `user_${Date.now()}`;
    const password = 'SecurePassword123!';

    await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.toggleCreateLoginDetails(true);
    await pimPage.fillLoginDetails(username, password, 'Enabled');
    await pimPage.clickSave();
    
    // Save can take slightly longer on dynamic user account creations
    await pimPage.expectSuccessToast();
    await expect(authenticatedPage).toHaveURL(/.*\/pim\/viewPersonalDetails/, { timeout: 30000 });
    logger.info(`P1b: Successfully created employee with linked login username: ${username}`);
  });

  test('P2a: Add employee with profile photo upload @regression', async ({ pageFactory, authenticatedPage }) => {
    test.setTimeout(90000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `PhotoFirst_${Date.now()}`;
    const lastName = `PhotoLast_${Date.now()}`;

    await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.uploadPhoto(dummyPhotoPath);
    await pimPage.clickSave();
    
    await pimPage.expectSuccessToast();
    await expect(authenticatedPage).toHaveURL(/.*\/pim\/viewPersonalDetails/, { timeout: 30000 });

    const isVisible = await pimPage.isProfilePhotoVisible();
    expect(isVisible).toBe(true);
    logger.info('P2a: Verified profile photo is uploaded and visible.');
  });

  test('P3: Search Employee List by name @smoke @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `SearchF_${Date.now()}`;
    const lastName = `SearchL_${Date.now()}`;
    const empId = await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    // Navigate to employee list
    await pimPage.navigateToEmployeeList();
    
    // Filter and search
    await pimPage.filterEmployeeList(firstName, empId);
    
    // Verify row displays
    const row = pimPage.getEmployeeRowLocator(empId);
    await expect(row).toBeVisible({ timeout: 20000 });
    logger.info('P3: Searched and verified employee matches criteria.');
  });

  test('P7: Negative - Add Employee with missing mandatory name fields @regression', async ({ pageFactory }) => {
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();
    
    // Leave names blank and click Save
    await pimPage.clickSave();
    
    // Check validation messages using placeholders
    const firstErr = await pimPage.getPlaceholderFieldErrorText('First Name');
    const lastErr = await pimPage.getPlaceholderFieldErrorText('Last Name');
    
    expect(firstErr).toBe('Required');
    expect(lastErr).toBe('Required');
    logger.info('P7: Negative validation confirmed for blank names.');
  });

  test('P6 & P9: Edit employee Personal & Job Details tabs @regression', async ({ pageFactory, authenticatedPage }) => {
    test.setTimeout(120000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `Details_${Date.now()}`;
    const lastName = `Test_${Date.now()}`;
    const empId = await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    // Verify redirected to details and tab Personal Details is loaded
    await expect(authenticatedPage).toHaveURL(/.*\/pim\/viewPersonalDetails/, { timeout: 30000 });
    
    // P6: Edit Personal Details
    await pimPage.editPersonalDetails('Indian', 'Married', '1992-06-20', 'Male');
    // Save Personal Details form specifically
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    // P9: Navigate to Job tab and edit Job Details
    await pimPage.clickJobTab();
    await pimPage.editJobDetails('QA Engineer', 'Development', 'Full-Time Permanent', '2026-07-01');
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    logger.info('P6 & P9: Personal details and job details tabs successfully updated.');
  });

  test('P15: Delete employee from the list @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const pimPage = pageFactory.getPIMPage();
    await pimPage.navigateToAddEmployee();

    const firstName = `DelF_${Date.now()}`;
    const lastName = `DelL_${Date.now()}`;
    const empId = await pimPage.fillEmployeeMandatoryFields(firstName, lastName);
    await pimPage.clickSave();
    await pimPage.expectSuccessToast();

    // Navigate to Employee List and Delete
    await pimPage.navigateToEmployeeList();
    await pimPage.filterEmployeeList(firstName, empId);
    
    await pimPage.deleteEmployee(empId);
    await pimPage.expectSuccessToast();

    // Verify removal
    await pimPage.clickReset();
    await pimPage.filterEmployeeList(firstName, empId);
    const row = pimPage.getEmployeeRowLocator(empId);
    await expect(row).toBeHidden({ timeout: 20000 });
    logger.info('P15: Verified employee is deleted from the list.');
  });
});
