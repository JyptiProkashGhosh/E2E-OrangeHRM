import { LoginPage } from '../pages/login.page';
import { logger } from '../utils/logger';

export class LoginHelper {
  private readonly loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  public async loginToSystem(username: string, password: string): Promise<void> {
    logger.info(`LoginHelper: Navigating and signing in user: ${username}`);
    await this.loginPage.navigateToLogin();
    await this.loginPage.login(username, password);
  }
}
