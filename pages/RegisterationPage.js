class RegisterationPage {
  constructor(page) {
    this.page = page;
    this.registerBtn = page.getByText('Register');
    this.emailBox = page.locator('#register-email');
    this.passwordBox = page.locator('#register-password');
    this.confirmPasswordBox = page.getByPlaceholder('Repeat your password');
    this.createAccountBtn = page.locator("#register-btn");
    this.browseEventBtn = page.getByRole('link', {name: 'Browse Events →',exact: true});
  }

  async navigate() {
    await this.page.goto('/register');
  }
  async emailInput(email) {
    await this.emailBox.fill(email);
  }
  async passwordInput(password) {
    await this.passwordBox.fill(password);
  }
    async confirmPasswordInput(confirmPassword) {
    await this.confirmPasswordBox.fill(confirmPassword);
    }

    async createAccount() {
    await this.createAccountBtn.click();
  }

  async fillRegistrationForm(email, password, confirmPassword) {
    await this.emailInput(email);
    await this.passwordInput(password);
    await this.confirmPasswordInput(confirmPassword);
  }

  async registerUser(user) {
    await this.fillRegistrationForm(user.email, user.password, user.confirmPassword);
    await this.createAccount();
  }

}

export { RegisterationPage };