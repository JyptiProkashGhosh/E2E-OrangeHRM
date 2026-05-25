import { Locator, Page } from "@playwright/test";

export class SidebarPage {
  readonly page: Page;

  // Sidebar Elements
  readonly sidebarSearch: Locator;
  readonly navAdmin: Locator;
  readonly navPIM: Locator;
  readonly navLeave: Locator;
  readonly navTime: Locator;
  readonly navRecruitment: Locator;
  readonly navMyInfo: Locator;
  readonly navPerformance: Locator;
  readonly navDashboard: Locator;
  readonly navDirectory: Locator;
  readonly navMaintenance: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar Navigation
    this.sidebarSearch = page.getByPlaceholder("Search");
    this.navAdmin = page.getByRole("link", { name: "Admin" });
    this.navPIM = page.getByRole("link", { name: "PIM" });
    this.navLeave = page.getByRole("link", { name: "Leave" });
    this.navTime = page.getByRole("link", { name: "Time" });
    this.navRecruitment = page.getByRole("link", { name: "Recruitment" });
    this.navMyInfo = page.getByRole("link", { name: "My Info" });
    this.navPerformance = page.getByRole("link", { name: "Performance" });
    this.navDashboard = page.getByRole("link", { name: "Dashboard" });
    this.navDirectory = page.getByRole("link", { name: "Directory" });
    this.navMaintenance = page.getByRole("link", { name: "Maintenance" });
  }

  // Navigation Methods
  async clickAdmin() {
    await this.navAdmin.click();
  }

  async clickPIM() {
    await this.navPIM.click();
  }

  async clickLeave() {
    await this.navLeave.click();
  }

  async clickTime() {
    await this.navTime.click();
  }

  async clickRecruitment() {
    await this.navRecruitment.click();
  }

  async clickMyInfo() {
    await this.navMyInfo.click();
  }

  async clickPerformance() {
    await this.navPerformance.click();
  }

  async clickDashboard() {
    await this.navDashboard.click();
  }

  async clickDirectory() {
    await this.navDirectory.click();
  }

  async clickMaintenance() {
    await this.navMaintenance.click();
  }

  async searchInSidebar(searchText: string) {
    await this.sidebarSearch.fill(searchText);
  }
}
