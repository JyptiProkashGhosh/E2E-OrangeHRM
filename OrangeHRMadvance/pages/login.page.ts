import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly requiredErrorMessages: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.alertMessage = page.locator('.oxd-alert');
    // Error under the input field if left empty
    this.requiredErrorMessages = page.locator('.oxd-input-group__message');
  }

  /**
   * Navigates to the login page
   */
  async goto(): Promise<void> {
    await this.navigate('/web/index.php/auth/login');
  }

  /**
   * Performs the complete login procedure.
   */
  async login(username: string, password: string): Promise<void> {
    if (username) {
      await this.fillInput(this.usernameInput, username, 'Username Input');
    } else {
      await this.usernameInput.clear();
    }
    
    if (password) {
      await this.fillInput(this.passwordInput, password, 'Password Input');
    } else {
      await this.passwordInput.clear();
    }
    
    await this.clickElement(this.loginButton, 'Login Button');
  }

  /**
   * Asserts that the invalid credentials banner appears.
   */
  async expectInvalidCredentialsMessage(): Promise<void> {
    await expect(this.alertMessage).toBeVisible();
    await expect(this.alertMessage).toContainText('Invalid credentials');
  }

  /**
   * Asserts that standard validation/required text displays under empty fields.
   */
  async expectRequiredMessageCount(count: number): Promise<void> {
    const errorCount = await this.requiredErrorMessages.count();
    expect(errorCount).toBe(count);
    for (let i = 0; i < count; i++) {
      await expect(this.requiredErrorMessages.nth(i)).toHaveText('Required');
    }
  }
}
