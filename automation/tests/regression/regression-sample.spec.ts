import { test, expect } from '../../src/fixtures/auth.fixture';
import { FileUtil } from '../../src/utils/file.util';
import { EmployeeDetails } from '../../src/types';
import * as path from 'path';
import { logger } from '../../src/utils/logger';

test.describe('OrangeHRM Regression Data-Driven Core', () => {
  test('Verify mock CSV reading and builder pattern integrations @regression', async ({}) => {
    const csvPath = path.resolve(process.cwd(), 'src/data/employee.csv');
    const employees = FileUtil.readCsvFile<EmployeeDetails>(csvPath);
    
    expect(employees.length).toBeGreaterThan(0);
    expect(employees[0].firstName).toBeDefined();
    logger.info(`Read ${employees.length} employees from mock CSV file successfully.`);
  });
});
