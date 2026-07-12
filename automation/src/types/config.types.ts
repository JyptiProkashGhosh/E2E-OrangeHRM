export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  environment: 'local' | 'qa' | 'uat' | 'production';
  timeoutUi: number;
  timeoutApi: number;
  debugMode: boolean;
}

export interface BrowserConfigOptions {
  headless: boolean;
  viewport: { width: number; height: number };
  video: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
  screenshot: 'off' | 'on' | 'only-on-failure';
  trace: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
}
