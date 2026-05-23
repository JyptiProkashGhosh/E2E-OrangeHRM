import {test as bastTest} from './common-fixtures';


type HooksFixtures = {
    gotoUrl: any;
    logout: any;
};

export const test = bastTest.extend<HooksFixtures>({
    gotoUrl: async ({loginPage}, use) => {
        await loginPage.gotoOrangeHRM();
        await use(loginPage);   
    },

    logout: async ({userPage}, use) => {
        await use(userPage);
        await userPage.logout();
    }


});

export {expect} from '@playwright/test';