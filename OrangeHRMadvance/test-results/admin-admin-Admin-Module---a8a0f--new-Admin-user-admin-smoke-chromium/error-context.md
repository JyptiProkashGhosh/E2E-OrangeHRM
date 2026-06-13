# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\admin.spec.ts >> Admin Module - User, Job, and Organization Management >> User Management Lifecycle >> Should create, search, and delete a new Admin user @admin @smoke
- Location: tests\admin\admin.spec.ts:64:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 60000ms exceeded.
=========================== logs ===========================
waiting for navigation until "domcontentloaded"
============================================================
```

# Test source

```ts
  11  |   readonly middleNameInput: Locator;
  12  |   readonly lastNameInput: Locator;
  13  |   readonly employeeIdInput: Locator;
  14  |   readonly fileInput: Locator;
  15  |   readonly saveButton: Locator;
  16  | 
  17  |   // Search Fields (Employee List)
  18  |   readonly searchEmployeeIdInput: Locator;
  19  |   readonly searchButton: Locator;
  20  |   readonly resetButton: Locator;
  21  | 
  22  |   // Table & Dialogs
  23  |   readonly tableRows: Locator;
  24  |   readonly deleteConfirmationButton: Locator;
  25  |   readonly successToast: Locator;
  26  | 
  27  |   constructor(page: Page) {
  28  |     super(page);
  29  |     
  30  |     // Top Navigation Tabs
  31  |     this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
  32  |     this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });
  33  | 
  34  |     // Form inputs (Add Employee)
  35  |     this.firstNameInput = page.getByPlaceholder('First Name');
  36  |     this.middleNameInput = page.getByPlaceholder('Middle Name');
  37  |     this.lastNameInput = page.getByPlaceholder('Last Name');
  38  |     // Find the input inside the input-group labeled "Employee Id"
  39  |     this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
  40  |     // Native file input for photo upload
  41  |     this.fileInput = page.locator('input[type="file"]');
  42  |     this.saveButton = page.getByRole('button', { name: 'Save' });
  43  | 
  44  |     // Search inputs (Employee List)
  45  |     this.searchEmployeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
  46  |     this.searchButton = page.getByRole('button', { name: 'Search' });
  47  |     this.resetButton = page.getByRole('button', { name: 'Reset' });
  48  | 
  49  |     // Results & Actions
  50  |     this.tableRows = page.locator('.oxd-table-card');
  51  |     // Confirm delete in the modal dialog
  52  |     this.deleteConfirmationButton = page.getByRole('button', { name: 'Yes, Delete' });
  53  |     
  54  |     // Success Toast Notification
  55  |     this.successToast = page.locator('.oxd-toast-container');
  56  |   }
  57  | 
  58  |   /**
  59  |    * Navigates to the Add Employee tab.
  60  |    */
  61  |   async navigateToAddEmployee(): Promise<void> {
  62  |     await this.clickElement(this.addEmployeeTab, 'Add Employee Tab');
  63  |   }
  64  | 
  65  |   /**
  66  |    * Navigates to the Employee List tab.
  67  |    */
  68  |   async navigateToEmployeeList(): Promise<void> {
  69  |     await this.clickElement(this.employeeListTab, 'Employee List Tab');
  70  |   }
  71  | 
  72  |   /**
  73  |    * Fills and submits the Add Employee form.
  74  |    */
  75  |   async addEmployee(
  76  |     firstName: string,
  77  |     lastName: string,
  78  |     middleName?: string,
  79  |     employeeId?: string,
  80  |     avatarPath?: string
  81  |   ): Promise<string> {
  82  |     await this.fillInput(this.firstNameInput, firstName, 'First Name');
  83  |     
  84  |     if (middleName) {
  85  |       await this.fillInput(this.middleNameInput, middleName, 'Middle Name');
  86  |     }
  87  |     
  88  |     await this.fillInput(this.lastNameInput, lastName, 'Last Name');
  89  | 
  90  |     // Retrieve or set the employee ID
  91  |     let finalEmpId = '';
  92  |     if (employeeId) {
  93  |       await this.fillInput(this.employeeIdInput, employeeId, 'Employee Id');
  94  |       finalEmpId = employeeId;
  95  |     } else {
  96  |       // Fetch the auto-generated ID if none is supplied
  97  |       const autoVal = await this.employeeIdInput.inputValue();
  98  |       finalEmpId = autoVal;
  99  |       console.log(`[Info] Using auto-generated Employee ID: ${finalEmpId}`);
  100 |     }
  101 | 
  102 |     // Avatar upload (if provided)
  103 |     if (avatarPath) {
  104 |       console.log(`[Action] Uploading avatar image: ${avatarPath}`);
  105 |       await this.fileInput.setInputFiles(avatarPath);
  106 |     }
  107 | 
  108 |     await this.clickElement(this.saveButton, 'Save Button');
  109 |     
  110 |     // Verify redirection/loading details or toast notification
> 111 |     await this.page.waitForURL(/.*viewPersonalDetails.*/, { waitUntil: 'domcontentloaded' });
      |                     ^ TimeoutError: page.waitForURL: Timeout 60000ms exceeded.
  112 |     console.log(`[Success] Employee ${firstName} ${lastName} created successfully!`);
  113 |     return finalEmpId;
  114 |   }
  115 | 
  116 |   /**
  117 |    * Searches for an employee in the list using their unique ID.
  118 |    */
  119 |   async searchEmployeeById(employeeId: string): Promise<void> {
  120 |     await this.fillInput(this.searchEmployeeIdInput, employeeId, 'Search Employee ID Input');
  121 |     await this.clickElement(this.searchButton, 'Search Button');
  122 |     // Wait for DOM content to load and let the subsequent web-first assertions do the auto-waiting
  123 |     await this.page.waitForLoadState('domcontentloaded');
  124 |   }
  125 | 
  126 |   /**
  127 |    * Deletes an employee by their ID and confirms the popup.
  128 |    */
  129 |   async deleteEmployee(employeeId: string): Promise<void> {
  130 |     console.log(`[Action] Attempting to delete employee with ID: ${employeeId}`);
  131 |     
  132 |     // Find the row containing our employee ID
  133 |     const row = this.tableRows.filter({ hasText: employeeId });
  134 |     await expect(row).toBeVisible();
  135 | 
  136 |     // Click the delete trash icon inside that specific row
  137 |     // OrangeHRM uses classes like `.bi-trash` or `.oxd-icon-button`
  138 |     const deleteButton = row.locator('.bi-trash');
  139 |     await this.clickElement(deleteButton, `Delete Icon for Employee: ${employeeId}`);
  140 | 
  141 |     // Confirm deletion in the popup modal
  142 |     await this.clickElement(this.deleteConfirmationButton, 'Yes, Delete Confirmation Button');
  143 |     
  144 |     // Allow the list to refresh
  145 |     await this.page.waitForLoadState('domcontentloaded');
  146 |     console.log(`[Success] Employee with ID ${employeeId} has been successfully deleted.`);
  147 |   }
  148 | 
  149 |   /**
  150 |    * Asserts that a row containing the employee ID is present in the table.
  151 |    */
  152 |   async expectEmployeeInTable(employeeId: string, shouldBePresent: boolean): Promise<void> {
  153 |     const row = this.tableRows.filter({ hasText: employeeId });
  154 |     if (shouldBePresent) {
  155 |       await expect(row).toBeVisible();
  156 |     } else {
  157 |       await expect(row).not.toBeVisible();
  158 |     }
  159 |   }
  160 | }
  161 | 
```