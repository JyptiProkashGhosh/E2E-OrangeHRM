// import process from 'process';
// import {test,expect,} from '../fixtures/hooks-fixtures';
// import loginModuleData from '../test_data/login-modul-data.json';

// test.use({storageState:{
//     cookies: [],
//     origins: []
        
// }
// })


// test ("[login] Verify login page loads successfully", async ({gotoUrl, loginPage}) => {
//     await expect(loginPage.loginButton).toBeVisible();
// });

// test("[Login] verify username and password fields and login button are visible on login page", async ({gotoUrl, loginPage}) => {
//     await expect(loginPage.userName).toBeVisible();
//     await expect(loginPage.password).toBeVisible();
//     await expect(loginPage.loginButton).toBeVisible();
// });

// test("[login] user can login with valid credentials", async ({
//   gotoUrl, dashboardPage,
//   loginPage,
//   commonUtil,
// }) => {
//   const username = commonUtil.decryptData(process.env.USER_NAME!);
//   const password = commonUtil.decryptData(process.env.PASSWORD!);
//   await loginPage.loginOrangeHRM(username, password);
//   await expect(dashboardPage.dashboardTitelText).toBeVisible();

// });

// test ("[login] User cannot login with invalid password", async ({gotoUrl, loginPage, commonUtil}) => {
//     const username = commonUtil.decryptData(process.env.USER_NAME!);
//     await loginPage.loginOrangeHRM(username, loginModuleData.wrong_password);
//     await expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
//     await expect(loginPage.userName).toBeVisible(); 
// });

// test ("[login] User cannot login with invalid username", async ({gotoUrl, loginPage, commonUtil}) => {
//     const password = commonUtil.decryptData(process.env.PASSWORD!);
//     await loginPage.loginOrangeHRM(loginModuleData.wrong_username, password);
//     await expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
//     await expect(loginPage.userName).toBeVisible(); 
// });

// test ("[login] User cannot login with invalid credentials", async ({gotoUrl, loginPage, commonUtil}) => {
//     await loginPage.loginOrangeHRM(loginModuleData.wrong_username, loginModuleData.wrong_password);
//     await expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
//     await expect(loginPage.userName).toBeVisible(); 
// });

// test ("[login] User cannot login with empty credentials", async ({gotoUrl, loginPage}) => {
//     await loginPage.loginOrangeHRM("", "");
//     await expect(loginPage.requiredUsernamePopup).toBeVisible();
//     await expect(loginPage.requiredPasswordPopup).toBeVisible();
//     await expect(loginPage.userName).toBeVisible(); 
// });

// test ("[login]Verify password masking on login page", async ({gotoUrl, loginPage, commonUtil}) => {
//     const password = commonUtil.decryptData(process.env.PASSWORD!);
//     await loginPage.enterPassword(password);
//     await expect(loginPage.password).toHaveAttribute("type", "password");
// });

// test("[Login] Verify Enter key login functionality", async ({gotoUrl, loginPage, dashboardPage, commonUtil}) => {
//     const username = commonUtil.decryptData(process.env.USER_NAME!);
//     const password = commonUtil.decryptData(process.env.PASSWORD!);
//     await loginPage.enterUsername(username);
//     await loginPage.enterPassword(password);
//     await loginPage.pressEnterToLogin();
//     await expect(dashboardPage.dashboardTitelText).toBeVisible();
// });  

// test("[Login] Verify logout functionality", async ({
//   page,
//   loginPage,
//   dashboardPage,
//   commonUtil,
//   userPage,
// }) => {
//   const decryptedUsername = commonUtil.decryptData(process.env.USER_NAME!);
//   console.log(decryptedUsername);
//   const decryptedPassword = commonUtil.decryptData(process.env.PASSWORD!);
//   console.log(decryptedPassword);
//   await loginPage.gotoOrangeHRM();
//   await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
//   await expect(dashboardPage.dashboardTitelText).toBeVisible();
//   await userPage.logout();
//   await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
// });

// test("[Login] Verify direct dashboard access without login", async ({ page, dashboardPage }) => {
//   await dashboardPage.gotoDashboard();
//   await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
// });

// test("[Login] Verify session persists after refresh", async ({
//   page,
//   loginPage,
//   dashboardPage,
//   commonUtil,
// }) => {
//   const username = commonUtil.decryptData(process.env.USER_NAME!);
//   const password = commonUtil.decryptData(process.env.PASSWORD!);
//   await loginPage.gotoOrangeHRM();
//   await loginPage.loginOrangeHRM(username, password);
//   await expect(dashboardPage.dashboardTitelText).toBeVisible();

//   //Verify session persists after refresh
//   await dashboardPage.page.reload();
//   await expect(dashboardPage.dashboardTitelText).toBeVisible();
// });

// test("[Login] Verify browser back button after logout", async ({
//   page,
//   loginPage,
//   dashboardPage,
//   commonUtil,
//   userPage,
// }) => {
//   const username = commonUtil.decryptData(process.env.USER_NAME!);
//   const password = commonUtil.decryptData(process.env.PASSWORD!);
//   await loginPage.gotoOrangeHRM();
//   await loginPage.loginOrangeHRM(username, password);
//   await expect(dashboardPage.dashboardTitelText).toBeVisible();
//   await userPage.logout();
//   await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
//   await page.goBack();
//   await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
// });


   

