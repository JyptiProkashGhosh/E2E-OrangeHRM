import { Page, Locator } from "@playwright/test";
import process from "process";

export class EmployeeListPage {
  readonly page: Page;

  // Header Navigation
  readonly configurationDropdown: Locator;
  readonly employeeListTab: Locator;
  readonly addEmployeeTab: Locator;
  readonly reportsTab: Locator;
  readonly helpButton: Locator;
  readonly upgradeButton: Locator;
  readonly userProfileDropdown: Locator;

  // Search/Filter Section - Employee Information
  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly employmentStatusDropdown: Locator;
  readonly includeDropdown: Locator;
  readonly supervisorNameInput: Locator;
  readonly jobTitleDropdown: Locator;
  readonly subUnitDropdown: Locator;

  // Search Action Buttons
  readonly resetButton: Locator;
  readonly searchButton: Locator;

  // Results Section
  readonly recordsFoundText: Locator;
  readonly addButton: Locator;

  // Table Elements
  readonly employeeTable: Locator;
  readonly tableHeaderCheckbox: Locator;
  readonly tableRows: Locator;
  readonly tableHeaderId: Locator;
  readonly tableHeaderFirstName: Locator;
  readonly tableHeaderLastName: Locator;
  readonly tableHeaderJobTitle: Locator;
  readonly tableHeaderEmploymentStatus: Locator;
  readonly tableHeaderSubUnit: Locator;
  readonly tableHeaderSupervisor: Locator;
  readonly tableHeaderActions: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header Navigation
    this.configurationDropdown = page.locator('button:has-text("Configuration")').first();
    this.employeeListTab = page.getByRole("link", { name: "Employee List" });
    this.addEmployeeTab = page.getByRole("link", { name: "Add Employee" });
    this.reportsTab = page.getByRole("link", { name: "Reports" });
    this.helpButton = page.locator('button:has-text("?")');
    this.upgradeButton = page.getByRole("button", { name: "Upgrade" });
    this.userProfileDropdown = page.locator(".oxd-userdropdown-tab");

    // Filter Section - Employee Information
    this.employeeNameInput = page.locator("input[placeholder='Type for hints...']").first();
    this.employeeIdInput = page.locator("input[placeholder='Type for hints...']").nth(1);
    this.employmentStatusDropdown = page.locator("div:has-text('Employment Status')").locator("xpath=../following-sibling::div//div[@role='combobox']");
    this.includeDropdown = page.locator("div:has-text('Include')").locator("xpath=../following-sibling::div//div[@role='combobox']");
    this.supervisorNameInput = page.locator("input[placeholder='Type for hints...']").nth(2);
    this.jobTitleDropdown = page.locator("div:has-text('Job Title')").locator("xpath=../following-sibling::div//div[@role='combobox']").first();
    this.subUnitDropdown = page.locator("div:has-text('Sub Unit')").locator("xpath=../following-sibling::div//div[@role='combobox']");

    // Action Buttons
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.searchButton = page.getByRole("button", { name: "Search" });

    // Results Section
    this.recordsFoundText = page.locator("text=/\\(\\d+\\) Records Found/");
    this.addButton = page.locator("button:has-text('+ Add')");

    // Table Elements
    this.employeeTable = page.locator(".oxd-table");
    this.tableHeaderCheckbox = page.locator("input[type='checkbox'][name='selectAll']");
    this.tableRows = page.locator(".oxd-table-body .oxd-table-row");
    this.tableHeaderId = page.getByText("Id");
    this.tableHeaderFirstName = page.getByText("First (& Middle) Name");
    this.tableHeaderLastName = page.getByText("Last Name");
    this.tableHeaderJobTitle = page.getByText("Job Title");
    this.tableHeaderEmploymentStatus = page.getByText("Employment Status");
    this.tableHeaderSubUnit = page.getByText("Sub Unit");
    this.tableHeaderSupervisor = page.getByText("Supervisor");
    this.tableHeaderActions = page.getByText("Actions");
  }

  // Navigation Methods
  async gotoEmployeeList() {
    await this.page.goto(
      `${process.env.BASE_URL}/web/index.php/pim/viewEmployeeList`,
    );
    await this.page.waitForLoadState("networkidle");
  }

  // Filter/Search Methods
  async filterByEmployeeName(name: string) {
    await this.employeeNameInput.fill(name);
  }

  async filterByEmployeeId(id: string) {
    await this.employeeIdInput.fill(id);
  }

  async filterByEmploymentStatus(status: string) {
    await this.employmentStatusDropdown.click();
    await this.page.getByRole("option", { name: status }).click();
  }

  async filterByInclude(include: string) {
    await this.includeDropdown.click();
    await this.page.getByRole("option", { name: include }).click();
  }

  async filterBySupervisorName(name: string) {
    await this.supervisorNameInput.fill(name);
  }

  async filterByJobTitle(title: string) {
    await this.jobTitleDropdown.click();
    await this.page.getByRole("option", { name: title }).click();
  }

  async filterBySubUnit(unit: string) {
    await this.subUnitDropdown.click();
    await this.page.getByRole("option", { name: unit }).click();
  }

  // Search Actions
  async clickSearch() {
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickReset() {
    await this.resetButton.click();
  }

  async search(filters: {
    employeeName?: string;
    employeeId?: string;
    employmentStatus?: string;
    include?: string;
    supervisorName?: string;
    jobTitle?: string;
    subUnit?: string;
  }) {
    if (filters.employeeName) {
      await this.filterByEmployeeName(filters.employeeName);
    }
    if (filters.employeeId) {
      await this.filterByEmployeeId(filters.employeeId);
    }
    if (filters.employmentStatus) {
      await this.filterByEmploymentStatus(filters.employmentStatus);
    }
    if (filters.include) {
      await this.filterByInclude(filters.include);
    }
    if (filters.supervisorName) {
      await this.filterBySupervisorName(filters.supervisorName);
    }
    if (filters.jobTitle) {
      await this.filterByJobTitle(filters.jobTitle);
    }
    if (filters.subUnit) {
      await this.filterBySubUnit(filters.subUnit);
    }
    await this.clickSearch();
  }

  // Table Interactions
  async getRecordsCount(): Promise<number> {
    const text = await this.recordsFoundText.textContent();
    const match = text?.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  async getTableRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getEmployeeRowByEmployeeId(employeeId: string): Promise<Locator> {
    return this.tableRows.filter({ hasText: employeeId });
  }

  async getEmployeeDataByRow(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex);
    const cells = row.locator(".oxd-table-cell");

    return {
      checkbox: cells.nth(0).locator("input[type='checkbox']"),
      id: await cells.nth(1).textContent(),
      firstName: await cells.nth(2).textContent(),
      lastName: await cells.nth(3).textContent(),
      jobTitle: await cells.nth(4).textContent(),
      employmentStatus: await cells.nth(5).textContent(),
      subUnit: await cells.nth(6).textContent(),
      supervisor: await cells.nth(7).textContent(),
      editButton: cells.nth(8).locator(".bi-pencil-fill, [data-v-f1493158]").first(),
      deleteButton: cells.nth(8).locator(".bi-trash, [data-v-f1493158]").last(),
    };
  }

  async clickEditEmployee(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator(".bi-pencil-fill, button").first().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickDeleteEmployee(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator(".bi-trash, button").last().click();
  }

  async editEmployeeByEmployeeId(employeeId: string) {
    const row = await this.getEmployeeRowByEmployeeId(employeeId);
    await row.locator("button").first().click();
    await this.page.waitForLoadState("networkidle");
  }

  async deleteEmployeeByEmployeeId(employeeId: string) {
    const row = await this.getEmployeeRowByEmployeeId(employeeId);
    await row.locator("button").last().click();
  }

  async selectEmployeeRow(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator("input[type='checkbox']").click();
  }

  async selectEmployeeByEmployeeId(employeeId: string) {
    const row = await this.getEmployeeRowByEmployeeId(employeeId);
    await row.locator("input[type='checkbox']").click();
  }

  async selectAllEmployees() {
    await this.tableHeaderCheckbox.click();
  }

  // Navigation Methods
  async clickAddEmployee() {
    await this.addButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickAddEmployeeTab() {
    await this.addEmployeeTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickReportsTab() {
    await this.reportsTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  // Assertions/Verification Methods
  async isTableVisible(): Promise<boolean> {
    return await this.employeeTable.isVisible();
  }

  async isSearchButtonEnabled(): Promise<boolean> {
    return await this.searchButton.isEnabled();
  }

  async isResetButtonEnabled(): Promise<boolean> {
    return await this.resetButton.isEnabled();
  }

  async isAddButtonVisible(): Promise<boolean> {
    return await this.addButton.isVisible();
  }

  async verifyEmployeeInList(employeeId: string): Promise<boolean> {
    const row = await this.getEmployeeRowByEmployeeId(employeeId);
    return await row.isVisible();
  }

  async getRecordsSummaryText(): Promise<string | null> {
    return await this.recordsFoundText.textContent();
  }

  async waitForTableToLoad() {
    await this.page.waitForSelector(".oxd-table-body .oxd-table-row", {
      timeout: 10000,
    });
  }

  async sortByColumn(columnName: string) {
    const header = this.page.locator(`.oxd-table-header-cell:has-text("${columnName}")`);
    await header.click();
  }

  async clearAllFilters() {
    await this.clickReset();
  }
}
