import { expect } from "playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { customTest } from '../../fixtures/testFixtures.js';
import {generateUser} from '../../utils/dataGenerator.js';
import { loginRequiredCases, invalidCredentialsCases, invalidEmailCases, edgeCases } from "../../test-data/loginData.js";

customTest.describe('Login Page', () => {
  customTest('should show the Browse Event after successful login', async ({ registerationPage, loginPage }) => {
    const user = generateUser();
    
    await registerationPage.navigate();
    await registerationPage.registerUser(user);
    await loginPage.navigate();
    await expect(loginPage.enterCredentialText).toBeVisible();
    await expect(loginPage.signPageText).toBeVisible();
    await loginPage.signInUser(user);
    await loginPage.waitForLoadState('networkidle');
    await expect(loginPage.homePageBtn).toBeVisible({timeout:15000});

    await expect(loginPage.myBookingsBtn).toBeVisible();
    await expect(loginPage.getUserEmail(user.email)).toBeVisible();
  });
  
  for (const tc of loginRequiredCases) {
        customTest(`shows validation for ${tc.scenario}`, async ({ loginPage }) => {
            await loginPage.navigate();
            await loginPage.fillSignInForm(tc.email, tc.password);
            await loginPage.signIn();
            await loginPage.expectLoginFormVisible();
        });
    }
  
    for (const tc of invalidEmailCases) {
        customTest(`shows validation for ${tc.scenario}`, async ({ loginPage }) => {
            await loginPage.navigate();
            await loginPage.fillSignInForm(tc.email, tc.password);
            await loginPage.signIn();
            await loginPage.expectNativeValidation(tc.validationField);
        });
    }
  
    for (const tc of invalidCredentialsCases) {
        customTest(`shows validation for ${tc.scenario}`, async ({ loginPage }) => {
            await loginPage.navigate();
            await loginPage.fillSignInForm(tc.email, tc.password);
            await loginPage.signIn();
            await loginPage.expectAuthenticationError();
        });
    }

        for (const tc of edgeCases) {
        customTest(`handles ${tc.scenario}`, async ({
            registerationPage,
            loginPage
        }) => {
            const scenario = `${tc.scenario}`;
            const user = generateUser();
    
            const email = `${tc.email.leading}${user.email}${tc.email.trailing}`;
            const password = `${tc.password.leading}${user.password}${tc.password.trailing}`;
    
            await registerationPage.navigate();
            await registerationPage.registerUser(user);
    
            await loginPage.navigate();
            await loginPage.fillSignInForm(email, password);
            if (scenario.includes('twice')) {
                await loginPage.signInTwice();
            } else {
                await loginPage.signIn();
            }   
            if (tc.expected === 'success') {
                await loginPage.waitForLoadState('networkidle');
                await expect(loginPage.homePageBtn).toBeVisible();
                await expect(loginPage.getUserEmail(user.email)).toBeVisible();
            }
    
            if (tc.expected === 'authError') {
                await loginPage.expectAuthenticationError();
            }
        });
    }
});
