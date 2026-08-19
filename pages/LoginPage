import { expect } from 'playwright/test';

class LoginPage{

    constructor(page){
        this.page = page;
        this.email = page.getByLabel("email");
        this.password = page.getByLabel("password");
        this.signInBtn = page.getByRole('button',{name:'Sign In'});
        this.signPageText = page.getByRole('heading', { name: 'Sign in to EventHub' });
        this.enterCredentialText = page.getByText('Enter your credentials to continue');
        this.eventHubTextOnHomePage = page.getByText('Discover & Book Amazing Events');
        this.browseEventsLink = page.getByRole('link', { name: 'Browse Events →', exact: true });
        this.authError = page.getByText('Invalid email or password', { exact: true });
        this.homePageBtn = page.getByTestId('nav-home');
        this.myBookingsBtn = page.getByTestId('nav-bookings');
    }

    //Actions - 

    // async navigate(){
    //     await this.page.goto(`${BASE_URL}`+"/login");
    // } // check why this didnt work

    async navigate(){
        const base = process.env.BASE_URL;
    if (base) {
      const url = new URL('/login', base).toString();
      await this.page.goto(url);
    } else {
      // fallback to relative navigation — relies on Playwright's baseURL or a running local server
      await this.page.goto('/login');
    }
    }

    async enterEmail(emailId){
        await this.email.fill(emailId);
    }
    async enterPassword(password){
        await this.password.fill(password);
    }

    async signIn(){
        await this.signInBtn.click();
    }
    async signInTwice() {
        const button = await this.signInBtn.boundingBox();

        if (!button) {
            throw new Error('Sign In button is not available');
        }

        await this.page.mouse.dblclick(
            button.x + button.width / 2,
            button.y + button.height / 2
        );
    }

    async fillSignInForm(emailId,password){
        await this.email.fill(emailId);
        await this.password.fill(password);
    }

    async signInUser(userInfo){
        
        await this.fillSignInForm(userInfo.email,userInfo.password);
        await this.signIn();
        
    }

    async waitForLoadState(state = 'networkidle') {
        await this.page.waitForLoadState(state);
    }

    async expectLoginFormVisible() {
        await expect(this.signPageText).toBeVisible();
        await expect(this.enterCredentialText).toBeVisible();
    }

    async expectNativeValidation(field) {
        const input = field === 'email' ? this.email : this.password;
        const message = await input.evaluate(element => element.validationMessage);
        await expect(message).not.toBe('');
    }

    async expectAuthenticationError() {
        await expect(this.authError).toBeVisible();
    }

    getUserEmail(email) {
        return this.page.getByText(email, { exact: true });
    }
}

export {LoginPage};