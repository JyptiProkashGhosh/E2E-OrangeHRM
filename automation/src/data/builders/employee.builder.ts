import { EmployeeDetails } from '../../types';
import { RandomUtil } from '../../utils/random.util';

export class EmployeeBuilder {
  private employee: EmployeeDetails;

  constructor() {
    const { firstName, lastName } = RandomUtil.getRandomName();
    this.employee = {
      firstName,
      lastName,
      middleName: '',
      employeeId: String(RandomUtil.getRandomNumber(100000, 999999)),
      jobTitle: RandomUtil.getRandomJobTitle(),
      status: 'Full-Time Permanent',
    };
  }

  public withFirstName(firstName: string): this {
    this.employee.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): this {
    this.employee.lastName = lastName;
    return this;
  }

  public withEmployeeId(employeeId: string): this {
    this.employee.employeeId = employeeId;
    return this;
  }

  public withJobTitle(jobTitle: string): this {
    this.employee.jobTitle = jobTitle;
    return this;
  }

  public build(): EmployeeDetails {
    return this.employee;
  }
}
