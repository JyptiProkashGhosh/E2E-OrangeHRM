import { ConfigManager } from './environment.config';

const envConfig = ConfigManager.getInstance().getEnvironmentConfig();

export const testConfig = {
  baseUrl: envConfig.baseUrl,
  apiUrl: envConfig.apiUrl,
  environment: envConfig.environment,
  timeout: {
    ui: envConfig.timeoutUi,
    api: envConfig.timeoutApi,
    global: 60000,
  },
  retries: envConfig.environment === 'production' ? 2 : 1,
};
