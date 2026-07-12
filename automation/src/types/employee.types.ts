export interface EmployeeName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface EmployeeDetails {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  jobTitle?: string;
  status?: string;
  subunit?: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  createDetails?: {
    username: string;
    password?: string;
    status: 'Enabled' | 'Disabled';
  };
}

export interface CreateEmployeeResponse {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
}
