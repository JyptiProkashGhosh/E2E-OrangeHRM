import { Locator, Page } from "@playwright/test";


export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialPopup: Locator;
  readonly requiredUsernamePopup: Locator ;
  readonly requiredPasswordPopup: Locator ;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.invalidCredentialPopup = page.getByRole('alert');
    this.requiredUsernamePopup = page.getByText('Required').first();
    this.requiredPasswordPopup = page.getByText('Required').nth(1);
  }
  // to navigate to the OrangeHRM login page
  async gotoOrangeHRM() {
    await this.page.goto(
      `${process.env.BASE_URL}/web/index.php/auth/login`,
    );
  }
  /**
   * To perform login action on the OrangeHRM application
   * @param username
   * @param password
   */
  async loginOrangeHRM(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async enterPassword(password: string){
    await this.password.fill(password);
  }

  async enterUsername(username: string) {
    await this.userName.fill(username);
  }

  async pressEnterToLogin() {
      await this.loginButton.press('Enter');
  }


}
