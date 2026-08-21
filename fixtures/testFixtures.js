import { test as base } from '@playwright/test';

import { RegisterationPage } from '../pages/RegisterationPage.js';
import { LoginPage } from '../pages/LoginPage';

export const customTest = base.extend({
    registerationPage: async ({ page }, use) => {
        await use(new RegisterationPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});