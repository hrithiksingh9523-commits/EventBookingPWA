export class  EventListingPage{
    constructor(page){
        this.page=page;
        this.eventsTabs = page.getByTestId("nav-events");
        this.upcomingEventsText = page.getByRole('heading',{name:'Upcoming Events'});
        this.experienceText = page.getByText("Find your next unforgettable experience");
        this.sandBoxText = page.locator("//span[contains(text(),'Your sandbox holds up to ')]");
        this.searchBox = page.getByPlaceholder("Search events, venues…");
        this.eventTitle = page.locator(".line-clamp-2");
        this.eventDetails = page.locator(".line-clamp-1");
        this.eventLocation = this.eventDetails.last();
        this.eventDate = this.eventDetails.first();
        this.eventPrice = page.locator('p:has-text("$")');
        this.remainingSeat = page.locator('span:has-text("seats left")');
        this.bookNow = page.getByTestId("book-now-btn");
        this.noEventText = page.getByText("No events found");
    }

    async navigateToHomePage(){
        const base = process.env.BASE_URL;
        await this.page.goto(base);
    }

    async clickBtn(){
        this.eventsTabs.click();
    }


}