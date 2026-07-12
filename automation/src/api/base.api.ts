import { APIRequestContext } from '@playwright/test';
import { ApiRequestOptions, ApiResponsePayload } from '../types';
import { logger } from '../utils/logger';

export class BaseApi {
  protected readonly requestContext: APIRequestContext;
  protected readonly apiPrefix: string;

  constructor(requestContext: APIRequestContext, apiPrefix: string = '') {
    this.requestContext = requestContext;
    this.apiPrefix = apiPrefix;
  }

  private resolveUrl(endpoint: string): string {
    return `${this.apiPrefix}${endpoint}`;
  }

  protected async sendRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponsePayload<T>> {
    const url = this.resolveUrl(endpoint);
    logger.debug(`API Request [${method}] to URL: ${url}`);
    
    const requestOptions = {
      headers: options.headers,
      params: options.params,
      data: options.data,
      failOnStatusCode: options.failOnStatusCode ?? false,
      timeout: options.timeout,
    };

    const response = await this.requestContext.fetch(url, {
      method,
      ...requestOptions,
    });

    const status = response.status();
    const statusText = response.statusText();
    const headers = response.headers();
    const ok = response.ok();
    
    let data: T;
    try {
      data = await response.json();
    } catch {
      data = (await response.text()) as any;
    }

    logger.debug(`API Response [${status}] ${statusText}`);
    return { status, statusText, headers, data, ok };
  }

  public async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return this.sendRequest<T>('GET', endpoint, options);
  }

  public async post<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return this.sendRequest<T>('POST', endpoint, options);
  }

  public async put<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return this.sendRequest<T>('PUT', endpoint, options);
  }

  public async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return this.sendRequest<T>('DELETE', endpoint, options);
  }
}
