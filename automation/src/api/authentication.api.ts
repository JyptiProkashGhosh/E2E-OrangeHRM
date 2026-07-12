import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import { ApiResponsePayload } from '../types';

export class AuthenticationApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext, '/web/index.php/api/v2/auth');
  }

  public async loginUser(username: string, password: string): Promise<ApiResponsePayload<any>> {
    return this.post<any>('/login', {
      data: { username, password },
    });
  }

  public async logoutUser(): Promise<ApiResponsePayload<any>> {
    return this.get<any>('/logout');
  }
}
