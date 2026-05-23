import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitelText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitelText = page.getByRole("heading", { name: "Dashboard" });
  }
}
