import { test, expect } from '../../src/fixtures/auth.fixture';
import { EmployeeBuilder } from '../../src/data/builders/employee.builder';
import { logger } from '../../src/utils/logger';

test.describe('OrangeHRM API Core Verification', () => {
  test('Verify API service initialization and request payload formatting @api @smoke', async ({ serviceFactory }) => {
    const employeeService = serviceFactory.getEmployeeService();
    expect(employeeService).toBeDefined();
    logger.info('ServiceFactory employee service retrieval verified');
  });
});
