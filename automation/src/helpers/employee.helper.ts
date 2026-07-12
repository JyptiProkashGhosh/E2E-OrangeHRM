import { PIMPage } from '../pages/pim.page';
import { logger } from '../utils/logger';

export class EmployeeHelper {
  private readonly pimPage: PIMPage;

  constructor(pimPage: PIMPage) {
    this.pimPage = pimPage;
  }

  public async createEmployee(firstName: string, lastName: string, employeeId?: string): Promise<string> {
    logger.info(`EmployeeHelper: Orchestrating employee creation for: ${firstName} ${lastName}`);
    await this.pimPage.clickAddEmployeeTab();
    return this.pimPage.addEmployee(firstName, lastName, employeeId);
  }
}
