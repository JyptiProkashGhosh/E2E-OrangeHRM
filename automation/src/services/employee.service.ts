import { PageFactory } from '../pages/page.factory';
import { EmployeeApi } from '../api/employee.api';
import { CreateEmployeeRequest, CreateEmployeeResponse, EmployeeDetails } from '../types';
import { logger } from '../utils/logger';

export class EmployeeService {
  private readonly pageFactory: PageFactory;
  private readonly employeeApi?: EmployeeApi;

  constructor(pageFactory: PageFactory, employeeApi?: EmployeeApi) {
    this.pageFactory = pageFactory;
    this.employeeApi = employeeApi;
  }

  public async registerEmployeeViaUI(firstName: string, lastName: string, employeeId?: string): Promise<string> {
    logger.info(`EmployeeService: Registering new employee via UI: ${firstName} ${lastName}`);
    const sidebar = this.pageFactory.getSidebarComponent();
    await sidebar.clickPim();

    const pimPage = this.pageFactory.getPIMPage();
    await pimPage.clickAddEmployeeTab();
    return pimPage.addEmployee(firstName, lastName, employeeId);
  }

  public async getEmployeeRecordViaAPI(): Promise<any> {
    if (!this.employeeApi) {
      throw new Error('EmployeeApi client not configured in EmployeeService');
    }
    logger.info('EmployeeService: Retrieving employee records via API');
    const response = await this.employeeApi.getEmployees();
    return response.data;
  }
}
