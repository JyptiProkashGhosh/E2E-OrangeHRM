import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { DashboardPage } from './dashboard.page';
import { AdminPage } from './admin.page';
import { PIMPage } from './pim.page';
import { LeavePage } from './leave.page';
import { RecruitmentPage } from './recruitment.page';
import { DirectoryPage } from './directory.page';
import { MyInfoPage } from './myinfo.page';
import { ForgotPasswordPage } from './forgot-password.page';
import { HeaderComponent } from '../components/header.component';
import { SidebarComponent } from '../components/sidebar.component';

/**
 * PageFactory centralizing Page Object creation and caching.
 * Follows Factory Pattern and Dependency Injection principles.
 */
export class PageFactory {
  private readonly page: Page;
  
  private loginPage?: LoginPage;
  private dashboardPage?: DashboardPage;
  private adminPage?: AdminPage;
  private pimPage?: PIMPage;
  private leavePage?: LeavePage;
  private recruitmentPage?: RecruitmentPage;
  private directoryPage?: DirectoryPage;
  private myInfoPage?: MyInfoPage;
  private forgotPasswordPage?: ForgotPasswordPage;
  private headerComponent?: HeaderComponent;
  private sidebarComponent?: SidebarComponent;

  constructor(page: Page) {
    this.page = page;
  }

  public getLoginPage(): LoginPage {
    if (!this.loginPage) this.loginPage = new LoginPage(this.page);
    return this.loginPage;
  }

  public getDashboardPage(): DashboardPage {
    if (!this.dashboardPage) this.dashboardPage = new DashboardPage(this.page);
    return this.dashboardPage;
  }

  public getAdminPage(): AdminPage {
    if (!this.adminPage) this.adminPage = new AdminPage(this.page);
    return this.adminPage;
  }

  public getPIMPage(): PIMPage {
    if (!this.pimPage) this.pimPage = new PIMPage(this.page);
    return this.pimPage;
  }

  public getLeavePage(): LeavePage {
    if (!this.leavePage) this.leavePage = new LeavePage(this.page);
    return this.leavePage;
  }

  public getRecruitmentPage(): RecruitmentPage {
    if (!this.recruitmentPage) this.recruitmentPage = new RecruitmentPage(this.page);
    return this.recruitmentPage;
  }

  public getDirectoryPage(): DirectoryPage {
    if (!this.directoryPage) this.directoryPage = new DirectoryPage(this.page);
    return this.directoryPage;
  }

  public getMyInfoPage(): MyInfoPage {
    if (!this.myInfoPage) this.myInfoPage = new MyInfoPage(this.page);
    return this.myInfoPage;
  }

  public getForgotPasswordPage(): ForgotPasswordPage {
    if (!this.forgotPasswordPage) this.forgotPasswordPage = new ForgotPasswordPage(this.page);
    return this.forgotPasswordPage;
  }

  public getHeaderComponent(): HeaderComponent {
    if (!this.headerComponent) this.headerComponent = new HeaderComponent(this.page);
    return this.headerComponent;
  }

  public getSidebarComponent(): SidebarComponent {
    if (!this.sidebarComponent) this.sidebarComponent = new SidebarComponent(this.page);
    return this.sidebarComponent;
  }
}
