import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class ForgotPasswordPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly cancelButton: Locator;
  private readonly resetButton: Locator;
  private readonly confirmationHeader: Locator;
  private readonly inlineError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.locator('.oxd-input');
    this.cancelButton = this.page.getByRole('button', { name: /cancel/i });
    this.resetButton = this.page.getByRole('button', { name: /reset/i });
    this.confirmationHeader = this.page.locator('.orangehrm-forgot-password-title');
    this.inlineError = this.page.locator('.oxd-input-group__message');
  }

  public async navigateToForgotPassword(): Promise<void> {
    await this.open('/web/index.php/auth/requestPasswordResetCode');
  }

  public async submitUsername(username: string): Promise<void> {
    logger.info(`ForgotPasswordPage: Submitting username reset request: ${username}`);
    await this.waitForVisible(this.usernameInput, 30000);
    await this.fill(this.usernameInput, username);
    await this.resetButton.click({ noWaitAfter: true });
  }

  public async clickCancel(): Promise<void> {
    logger.info('ForgotPasswordPage: Clicking Cancel button');
    await this.waitForVisible(this.cancelButton, 30000);
    await this.click(this.cancelButton);
  }

  public async getConfirmationMessage(): Promise<string> {
    await this.waitForVisible(this.confirmationHeader, 30000);
    return this.getText(this.confirmationHeader);
  }

  public async getInlineErrorMessage(): Promise<string> {
    await this.waitForVisible(this.inlineError, 30000);
    return this.getText(this.inlineError);
  }

  public getUsernameInputLocator(): Locator {
    return this.usernameInput;
  }

  public getCancelButtonLocator(): Locator {
    return this.cancelButton;
  }

  public getResetButtonLocator(): Locator {
    return this.resetButton;
  }

  public getConfirmationHeaderLocator(): Locator {
    return this.confirmationHeader;
  }

  public getInlineErrorLocator(): Locator {
    return this.inlineError;
  }
}
