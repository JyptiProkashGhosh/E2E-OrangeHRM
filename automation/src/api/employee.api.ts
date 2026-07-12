import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import { ApiResponsePayload, CreateEmployeeRequest, CreateEmployeeResponse } from '../types';

export class EmployeeApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext, '/web/index.php/api/v2/pim');
  }

  public async getEmployees(): Promise<ApiResponsePayload<any>> {
    return this.get<any>('/employees');
  }

  public async addEmployee(employee: CreateEmployeeRequest): Promise<ApiResponsePayload<CreateEmployeeResponse>> {
    return this.post<CreateEmployeeResponse>('/employees', {
      data: employee,
    });
  }

  public async deleteEmployee(id: string): Promise<ApiResponsePayload<any>> {
    return this.delete<any>(`/employees/${id}`);
  }
}
