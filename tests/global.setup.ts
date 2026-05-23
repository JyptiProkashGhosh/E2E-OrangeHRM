import { test } from "../fixtures/common-fixtures";
import { expect, Expect } from "@playwright/test";

test("Global setup for auto login", async ({
  page,
  loginPage,
  dashboardPage,
  commonUtil,
}) => {
  const decryptedUsername = commonUtil.decryptData(process.env.USER_NAME!);
  console.log(decryptedUsername);
  const decryptedPassword = commonUtil.decryptData(process.env.PASSWORD!);
  console.log(decryptedPassword);

  await loginPage.gotoOrangeHRM();
  await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);

  //   await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.waitForURL(
    `${process.env.BASE_URL}/web/index.php/dashboard/index`,
  );
  await expect(dashboardPage.dashboardTitelText).toBeVisible();
  await page.context().storageState({ path: "./playwright/.auth/auth.json" });
});
