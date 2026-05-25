import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { UserPage } from "../pages/UserPage";
import { SidebarPage } from "../pages/SidebarPage";

type PomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userPage: UserPage;
  sidebar: SidebarPage;
};

export const test = baseTest.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  },

  sidebar: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
});
