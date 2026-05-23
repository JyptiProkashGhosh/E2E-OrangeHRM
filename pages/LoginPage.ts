import { Locator, Page } from "@playwright/test";


export class LoginPage {
  static gotoOrangeHRM(page: Page) {
    throw new Error("Method not implemented.");
  }
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.invalidCredentialPopup = page.getByRole('alert');
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
}
