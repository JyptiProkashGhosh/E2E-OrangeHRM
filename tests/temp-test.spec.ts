import { expect } from "@playwright/test";
import { test } from "../fixtures/hooks-fixtures";
// import { test } from "../fixtures/common-fixtures";
// import CommonUtil from "../utils/CommonUtil";

// test.describe("Temp test suite", () => {
//   // test.beforeEach(
//   //   "login to OrangeHRM",
//   //   async ({ page, loginPage, dashboardPage, commonUtil }) => {
//   //     await loginPage.gotoOrangeHRM();
//   //   },
//   // );

//   // test.afterEach("logout from OrangeHRM", async ({ page, userPage }) => {
//   //   await userPage.logout();
//   // });
  


// });

  // test("Temp test 2", async ({ page, gotoUrl }) => {
  //   // await loginPage.gotoOrangeHRM();
  //   expect(page).toHaveTitle("OrangeHRM");
  // });

  // test("Temp test 3", async ({ page, gotoUrl, logout }) => {
  //   // await loginPage.gotoOrangeHRM();
  //   console.log(await page.title());
  // });

// test("Temp test 1", async ({ page, loginPage, }) => {

// //   console.log(process.env.BASE_URL);
// //   console.log(process.env.USERNAME);
// //   console.log(process.env.PASSWORD);

// //   const commonUtil = new CommonUtil();
// //   commonUtil.encrypyData ('Admin');

// //     // const decryptedUsername = commonUtil.decryptData(process.env.USERNAME!);
// //     // const decryptedPassword = commonUtil.decryptData(process.env.PASSWORD!);
// //     // console.log(decryptedUsername);
// //     // console.log(decryptedPassword);

//     await loginPage.gotoOrangeHRM();
//     console.log(await page.title());

// //     // await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
// //     // await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

// });



// await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
// await page.getByRole('textbox', { name: 'Username' }).click();
// await page.getByRole('textbox', { name: 'Username' }).fill('jyoti');
// await page.getByRole('textbox', { name: 'Password' }).click();
// await page.getByRole('textbox', { name: 'Password' }).fill('nshashd');
// await page.getByRole('button', { name: 'Login' }).click();
// await page.getByRole('alert').click();
// await expect(page.getByRole('alert')).toContainText('Invalid credentials');