import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import { ApiResponsePayload } from '../types';

export class LeaveApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext, '/web/index.php/api/v2/leave');
  }

  public async getLeaveList(): Promise<ApiResponsePayload<any>> {
    return this.get<any>('/leaves');
  }

  public async applyLeave(leaveDetails: any): Promise<ApiResponsePayload<any>> {
    return this.post<any>('/apply', {
      data: leaveDetails,
    });
  }
}
