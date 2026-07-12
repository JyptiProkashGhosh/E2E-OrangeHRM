export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: any;
  failOnStatusCode?: boolean;
  timeout?: number;
}

export interface ApiResponsePayload<T> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  ok: boolean;
}
