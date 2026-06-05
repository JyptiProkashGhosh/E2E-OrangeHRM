import { test, expect } from '../../fixtures/auth.fixture';
import { Helpers } from '../../utils/helpers';
import * as fs from 'fs';

test.describe('PIM - Employee Management Lifecycle', () => {
  let employeeId: string;
  let firstName: string;
  let lastName: string;
  let avatarPath: string;

  test.beforeAll(async () => {
    // Generate dynamic names and create a dummy image for file uploading
    firstName = 'QA_' + Helpers.getRandomString(6);
    lastName = 'Engineer_' + Helpers.getRandomString(6);
    avatarPath = Helpers.createDummyUploadFile('test_avatar.png');
  });

  test.afterAll(async () => {
    // Clean up local generated test file
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
      console.log(`[Teardown] Deleted local dummy file: ${avatarPath}`);
    }
  });

  test.beforeEach(async ({ dashboardPage }) => {
    // Navigate to dashboard page to activate cached cookies and session state
    await dashboardPage.navigate('/web/index.php/dashboard/index');
  });

  test('Should perform complete Employee lifecycle (Add -> Search -> Delete) @pim @smoke', async ({ 
    dashboardPage, 
    pimPage 
  }) => {
    // 1. Navigate to PIM module
    await dashboardPage.clickPIM();
    await dashboardPage.expectHeaderTitle('PIM');

    // 2. Click Add Employee
    await pimPage.navigateToAddEmployee();

    // 3. Add Employee with details and dynamic file upload
    const customEmpId = Helpers.getRandomNumberString(5);
    employeeId = await pimPage.addEmployee(
      firstName, 
      lastName, 
      'Automation', 
      customEmpId, 
      avatarPath
    );

    // 4. Return to employee directory
    await pimPage.navigateToEmployeeList();

    // 5. Search for the employee by ID
    await pimPage.searchEmployeeById(employeeId);

    // 6. Verify employee exists in the table
    await pimPage.expectEmployeeInTable(employeeId, true);

    // 7. Delete the employee
    await pimPage.deleteEmployee(employeeId);

    // 8. Search again and verify deleted employee is not in the table
    await pimPage.searchEmployeeById(employeeId);
    await pimPage.expectEmployeeInTable(employeeId, false);
  });
});
