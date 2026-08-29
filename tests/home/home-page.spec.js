import {test, expect, request} from '@playwright/test';

import { customTest } from '../../fixtures/testFixtures.js';
import {generateUser} from '../../utils/dataGenerator.js';
import { HomePage } from '../../pages/HomePage.js';

const loginPayload = {email: "hrithik123@gmail.com", password: "Hrithik@123"};
let token;

test.beforeAll(async ()=>{
   const apiContext  = await request.newContext();
   const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
        data:loginPayload
    }
   )
   expect(loginResponse.ok()).toBeTruthy();
   const loginResponseJson = await loginResponse.json();
   token = loginResponseJson.token;
})

customTest.describe('Home Page', () => {

    customTest('Home Page Validation', async ({ registerationPage, loginPage, page }) => {
        const user = generateUser();
        const homePage = new HomePage(page);
        await page.addInitScript(value=>{
            window.localStorage.setItem('eventhub_token',value);
        },token);//addInitScript takes two arguments, first is the function and second one is the parameters
        // await homePage.navigateToHomePage();
        await page.goto("https://eventhub.rahulshettyacademy.com/");
        await expect(homePage.discoverAndBookText).toBeVisible();
        await expect(homePage.browseEventText).toBeVisible();
        await expect(homePage.navigateToHome).toBeVisible();
        await expect(homePage.navigateToEvents).toBeVisible();
        await expect(homePage.myBookingsText).toBeVisible();
        await expect(homePage.apiDocsLink).toBeVisible();
        await expect(homePage.userEmail).toHaveText(loginPayload.email);
        await expect(homePage.logOutBtn).toBeVisible();
        await page.reload();
        await expect(homePage.apiDocsLink).toBeVisible();
        await expect(homePage.userEmail).toHaveText(loginPayload.email);
        await expect(homePage.logOutBtn).toBeVisible();
    });

    customTest("Navigate to Home Page Without Login", async ({page})=>{
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        const currentUrl = await homePage.getUrl();
        await expect(currentUrl).toContain('https://eventhub.rahulshettyacademy.com/');
        const[ swaggerPage ] = await Promise.all([
            page.context().waitForEvent('page'),
            homePage.swaggerLink.click()
        ])
        
        await page.waitForLoadState();
        await expect(swaggerPage).toHaveTitle("EventHub API Docs");
        await expect(swaggerPage).toHaveURL("https://api.eventhub.rahulshettyacademy.com/api/docs/");
    });

});