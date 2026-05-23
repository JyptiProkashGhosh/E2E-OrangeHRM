import {test,expect,} from '../fixtures/hooks-fixtures';
import loginModuleData from '../test_data/login-modul-data.json';

test.use({storageState:{
    cookies: [],
    origins: []
        
}
})

test ("[login] User cannot login with invalid password", async ({gotoUrl, loginPage, commonUtil}) => {
    const username = commonUtil.decryptData(process.env.USER_NAME!);
    await loginPage.loginOrangeHRM(username, loginModuleData.wrong_password);
    expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
    expect(loginPage.userName).toBeVisible(); 
});

test ("[login] User cannot login with invalid username", async ({gotoUrl, loginPage, commonUtil}) => {
    const password = commonUtil.decryptData(process.env.PASSWORD!);
    await loginPage.loginOrangeHRM(loginModuleData.wrong_username, password);
    expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
    expect(loginPage.userName).toBeVisible(); 
});

test ("[login] User cannot login with invalid credentials", async ({gotoUrl, loginPage, commonUtil}) => {
    await loginPage.loginOrangeHRM(loginModuleData.wrong_username, loginModuleData.wrong_password);
    expect(loginPage.invalidCredentialPopup).toContainText(loginModuleData.invalid_credential_message);
    expect(loginPage.userName).toBeVisible(); 
});

