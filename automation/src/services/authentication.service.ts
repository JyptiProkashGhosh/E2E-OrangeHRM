import { Page } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { logger } from '../utils/logger';

export class AuthenticationService {
  private readonly pageFactory: PageFactory;

  constructor(pageFactory: PageFactory) {
    this.pageFactory = pageFactory;
  }

  public async loginToDashboard(username: string, password: string): Promise<boolean> {
    logger.info(`AuthService: Logging in user "${username}"`);
    const loginPage = this.pageFactory.getLoginPage();
    await loginPage.navigateToLogin();
    await loginPage.login(username, password);
    
    const dashboardPage = this.pageFactory.getDashboardPage();
    return dashboardPage.isDashboardLoaded();
  }

  public async logoutFromSystem(): Promise<void> {
    logger.info('AuthService: Logging out');
    const header = this.pageFactory.getHeaderComponent();
    await header.clickProfileDropdown();
    await header.clickLogout();
  }
}
