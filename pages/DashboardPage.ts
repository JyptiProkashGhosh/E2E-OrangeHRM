import { Page, Locator } from "@playwright/test";
import process from "process";
import { SidebarPage } from "./SidebarPage";

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: SidebarPage;

  // Header Elements
  readonly dashboardTitelText: Locator;
  readonly upgradeButton: Locator;
  readonly userProfileButton: Locator;

  // Time at Work Widget
  readonly timeAtWorkWidget: Locator;
  readonly punchStatus: Locator;
  readonly todayHours: Locator;

  // My Actions Widget
  readonly pendingSelfReview: Locator;
  readonly candidateToInterview: Locator;

  // Quick Launch Widget
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timesheetsButton: Locator;
  readonly applyLeaveButton: Locator;
  readonly myLeaveButton: Locator;
  readonly myTimesheetButton: Locator;

  // Buzz Latest Posts Widget
  readonly buzzPostsWidget: Locator;

  // Charts/Analytics Widgets
  readonly employeesOnLeaveWidget: Locator;
  readonly employeeDistributionSubUnitChart: Locator;
  readonly employeeDistributionLocationChart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarPage(page);

    // Header
    this.dashboardTitelText = page.getByRole("heading", { name: "Dashboard" });
    this.upgradeButton = page.getByRole("button", { name: "Upgrade" });
    this.userProfileButton = page.locator(".oxd-userdropdown-tab");

    // Time at Work Widget
    this.timeAtWorkWidget = page.locator("text=Time at Work").locator("..");
    this.punchStatus = page.getByText("Punched Out");
    this.todayHours = page.getByText(/0h 0m Today/);

    // My Actions
    this.pendingSelfReview = page.getByText("Pending Self Review");
    this.candidateToInterview = page.getByText("Candidate to Interview");

    // Quick Launch
    this.assignLeaveButton = page.getByRole("button", { name: "Assign Leave" });
    this.leaveListButton = page.getByRole("button", { name: "Leave List" });
    this.timesheetsButton = page.getByRole("button", { name: "Timesheets" });
    this.applyLeaveButton = page.getByRole("button", { name: "Apply Leave" });
    this.myLeaveButton = page.getByRole("button", { name: "My Leave" });
    this.myTimesheetButton = page.getByRole("button", { name: "My Timesheet" });

    // Buzz Posts
    this.buzzPostsWidget = page.locator("text=Buzz Latest Posts").locator("..");

    // Charts
    this.employeesOnLeaveWidget = page.locator("text=Employees on Leave Today").locator("..");
    this.employeeDistributionSubUnitChart = page.locator("text=Employee Distribution by Sub Unit").locator("..");
    this.employeeDistributionLocationChart = page.locator("text=Employee Distribution by Location").locator("..");
  }

  // Navigation Methods
  async gotoDashboard() {
    await this.page.goto(
      `${process.env.BASE_URL}/web/index.php/dashboard/index`,
    );
  }

  // Quick Launch Actions
  async clickAssignLeave() {
    await this.assignLeaveButton.click();
  }

  async clickLeaveList() {
    await this.leaveListButton.click();
  }

  async clickTimesheets() {
    await this.timesheetsButton.click();
  }

  async clickApplyLeave() {
    await this.applyLeaveButton.click();
  }

  async clickMyLeave() {
    await this.myLeaveButton.click();
  }

  async clickMyTimesheet() {
    await this.myTimesheetButton.click();
  }

  // User Menu
  async clickUserProfile() {
    await this.userProfileButton.click();
  }

  async clickUpgrade() {
    await this.upgradeButton.click();
  }
}
