import { test as base } from '@playwright/test';

import { RegisterationPage } from '../pages/RegisterationPage.js';

export const customTest = base.extend({
    registerationPage: async ({ page }, use) => {
        await use(new RegisterationPage(page));
    }
});