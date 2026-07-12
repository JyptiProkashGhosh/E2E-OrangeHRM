import { PageFactory } from '../pages/page.factory';
import { APIRequestContext } from '@playwright/test';
import { AuthenticationService } from './authentication.service';
import { EmployeeService } from './employee.service';
import { LeaveService } from './leave.service';
import { RecruitmentService } from './recruitment.service';
import { EmployeeApi } from '../api/employee.api';
import { LeaveApi } from '../api/leave.api';

/**
 * ServiceFactory implementing the Factory Pattern.
 * Coordinates instantiating services with dependency injection.
 */
export class ServiceFactory {
  private readonly pageFactory: PageFactory;
  private readonly requestContext?: APIRequestContext;

  private authService?: AuthenticationService;
  private employeeService?: EmployeeService;
  private leaveService?: LeaveService;
  private recruitmentService?: RecruitmentService;

  constructor(pageFactory: PageFactory, requestContext?: APIRequestContext) {
    this.pageFactory = pageFactory;
    this.requestContext = requestContext;
  }

  public getAuthService(): AuthenticationService {
    if (!this.authService) {
      this.authService = new AuthenticationService(this.pageFactory);
    }
    return this.authService;
  }

  public getEmployeeService(): EmployeeService {
    if (!this.employeeService) {
      const employeeApi = this.requestContext ? new EmployeeApi(this.requestContext) : undefined;
      this.employeeService = new EmployeeService(this.pageFactory, employeeApi);
    }
    return this.employeeService;
  }

  public getLeaveService(): LeaveService {
    if (!this.leaveService) {
      const leaveApi = this.requestContext ? new LeaveApi(this.requestContext) : undefined;
      this.leaveService = new LeaveService(this.pageFactory, leaveApi);
    }
    return this.leaveService;
  }

  public getRecruitmentService(): RecruitmentService {
    if (!this.recruitmentService) {
      this.recruitmentService = new RecruitmentService(this.pageFactory);
    }
    return this.recruitmentService;
  }
}
