import { APIRequestContext } from '@playwright/test';
import { EmployeeApi } from '../api/employee.api';
import { logger } from '../utils/logger';

export class CleanupHelper {
  private readonly createdEmployeeIds: string[] = [];
  private readonly employeeApi?: EmployeeApi;

  constructor(requestContext?: APIRequestContext) {
    if (requestContext) {
      this.employeeApi = new EmployeeApi(requestContext);
    }
  }

  public trackEmployee(id: string): void {
    logger.info(`CleanupHelper: Tracking employee ID: ${id} for post-test removal`);
    this.createdEmployeeIds.push(id);
  }

  public async performCleanup(): Promise<void> {
    if (!this.employeeApi) {
      logger.warn('CleanupHelper: API Context not configured. Skipping automated cleanup.');
      return;
    }

    if (this.createdEmployeeIds.length === 0) {
      logger.info('CleanupHelper: No records tracked. Nothing to clean.');
      return;
    }

    logger.info(`CleanupHelper: Commencing cleanup for ${this.createdEmployeeIds.length} records`);
    for (const id of this.createdEmployeeIds) {
      try {
        await this.employeeApi.deleteEmployee(id);
        logger.info(`CleanupHelper: Cleaned up record ID: ${id}`);
      } catch (e: any) {
        logger.error(`CleanupHelper: Failed to remove record ID: ${id}. Error: ${e.message}`);
      }
    }
    this.createdEmployeeIds.length = 0; // Empty tracker list
  }
}
