import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.submitButton = this.page.getByRole('button', { name: /login/i });
    this.errorMessage = this.page.locator('.oxd-alert-content-text');
    this.forgotPasswordLink = this.page.locator('.orangehrm-login-forgot-header');
  }

  public async navigateToLogin(): Promise<void> {
    await this.open('/web/index.php/auth/login');
  }

  public async login(username: string, password: string): Promise<void> {
    logger.info(`LoginPage: Attempting login for username: ${username}`);
    await this.waitForVisible(this.usernameInput, 30000);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.submitButton);
  }

  public async loginWithEnter(username: string, password: string): Promise<void> {
    logger.info(`LoginPage: Attempting login via Enter key for username: ${username}`);
    await this.waitForVisible(this.usernameInput, 30000);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.page.keyboard.press('Enter');
  }

  public async clickForgotPassword(): Promise<void> {
    logger.info('LoginPage: Clicking Forgot Password link');
    await this.waitForVisible(this.forgotPasswordLink, 30000);
    await this.click(this.forgotPasswordLink);
    // If navigation doesn't happen, retry click up to 3 times (resolves event handler binding delay)
    for (let i = 0; i < 3; i++) {
      if (this.page.url().includes('/auth/login')) {
        await this.page.waitForTimeout(1500);
        if (this.page.url().includes('/auth/login')) {
          logger.info('LoginPage: Still on login page, re-clicking Forgot Password link');
          await this.click(this.forgotPasswordLink);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  public getForgotPasswordLocator(): Locator {
    return this.forgotPasswordLink;
  }

  public getUsernameInputLocator(): Locator {
    return this.usernameInput;
  }

  public getPasswordInputLocator(): Locator {
    return this.passwordInput;
  }

  public getLoginButtonLocator(): Locator {
    return this.submitButton;
  }

  public async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage, 30000);
    return this.getText(this.errorMessage);
  }

  public getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }

  public async isLoginButtonVisible(): Promise<boolean> {
    try {
      await this.waitForVisible(this.submitButton, 30000);
      return this.isVisible(this.submitButton);
    } catch {
      return false;
    }
  }

  /**
   * Fetches validation error messages (e.g. "Required") displayed below empty fields.
   */
  public getFieldErrorLocator(placeholder: string): Locator {
    return this.page.locator('.oxd-input-group')
      .filter({ has: this.page.getByPlaceholder(placeholder) })
      .locator('.oxd-input-group__message');
  }

  public async getFieldValidationError(placeholder: string): Promise<string> {
    const locator = this.getFieldErrorLocator(placeholder);
    await this.waitForVisible(locator, 30000);
    return this.getText(locator);
  }
}
