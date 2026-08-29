import {test,expect,request} from '@playwright/test';
import { EventListingPage } from '../../pages/EventListingPage';
import { searchData, nonExistingEvent } from '../../test-data/searchFunctionality';
import { expectedData } from '../../constants/constants';

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
test.describe("Event Catalog Page", ()=>{
    test("Test Landing Page of Event", async({page})=>{
        const event = new EventListingPage(page);
        await page.addInitScript((value)=>{
            window.localStorage.setItem("eventhub_token",value);
        },token);
        await event.navigateToHomePage();
        
        
        await event.clickBtn();
        await expect(event.experienceText).toBeVisible();
        await expect(event.upcomingEventsText).toBeVisible();
        const sandBoxText = await event.sandBoxText.textContent();

        const sandBoxArray = sandBoxText.split(" ");
        const bookingEventText = sandBoxArray[5];
        const customEvent = sandBoxArray[13];

        bookingEventText==="9";
        customEvent==="6";
    });

    for(const tc of searchData){
        test(`Test Search Functionality for ${tc.scenario}`, async({page})=>{
        const event = new EventListingPage(page);
        await page.addInitScript((value)=>{
            window.localStorage.setItem("eventhub_token",value);
        },token);
        await event.navigateToHomePage();
        
        await event.clickBtn();
        
        await expect(event.searchBox).toBeVisible();
        await event.searchBox.fill(tc.text);
        await expect(event.eventTitle).toHaveCount(1);
        
        await expect(event.eventTitle).toHaveText(expectedData.searchData.eventTitle);
        await expect(event.eventDate).toHaveText(expectedData.searchData.eventDate);
        await expect(event.eventLocation).toHaveText(expectedData.searchData.eventLocation);
        await expect(event.eventPrice).toHaveText(expectedData.searchData.eventPrice);
        const seatCount = await event.remainingSeat.textContent();
        const remainingSeats = Number.parseInt(seatCount);

        await expect(remainingSeats).toBeGreaterThanOrEqual(1);
        await expect(event.bookNow).toBeVisible();
    })
    };
        test(`Test Search Functionality for ${nonExistingEvent[0].scenario}`, async({page})=>{
        const event = new EventListingPage(page);
        await page.addInitScript((value)=>{
            window.localStorage.setItem("eventhub_token",value);
        },token);
        await event.navigateToHomePage();
        
        await event.clickBtn();
        
        await expect(event.searchBox).toBeVisible();
        await event.searchBox.fill(nonExistingEvent[0].text);
        await expect(event.noEventText).toHaveText(expectedData.searchData.noEventText);
    })
    
    
})
