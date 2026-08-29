class HomePage{
    /*
    - Page header: `Discover & Book Amazing Events`
- Quick links/buttons: `Browse Events →`, `My Bookings`
- Featured event cards
- Navigation bar with `Home`, `Events`, `My Bookings`, `API Docs`, `Admin`, user email, `Logout`
*/
    constructor(page){
        this.page = page;
        this.discoverAndBookText = page.getByRole('heading',{name:'Discover & Book'});
        this.browseEventText = page.getByText('Browse Events →');
        this.navigateToHome = page.getByText('Home');
        this.navigateToEvents = page.getByTestId('nav-events');
        this.myBookingsText = page.getByTestId('nav-bookings');
        this.apiDocsLink = page.getByText('API Docs');
        this.userEmail = page.getByTestId('user-email-display');
        this.logOutBtn = page.getByTestId('logout-btn');
        this.swaggerLink = page.getByText('API Documentation (Swagger)');
    }

    async navigateToHomePage(){
        const base = process.env.BASE_URL;
        await this.page.goto(base);
    }
    
    async getUrl(){
        return this.page.url();
    }
}

export {HomePage};