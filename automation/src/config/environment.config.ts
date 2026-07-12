import * as dotenv from 'dotenv';
import * as path from 'path';
import { EnvironmentConfig } from '../types';
import { EnvironmentUtil } from '../utils/environment.util';

/**
 * Configuration Manager implementing the Singleton Pattern.
 * Manages loading environment variables and providing a strongly-typed config.
 */
export class ConfigManager {
  private static instance: ConfigManager | null = null;
  private readonly config: EnvironmentConfig;

  private constructor() {
    const environment = process.env.NODE_ENV || 'local';
    const envPath = path.resolve(process.cwd(), `.env.${environment}`);
    
    dotenv.config({ path: envPath });

    this.config = {
      baseUrl: EnvironmentUtil.getEnvString('BASE_URL', 'https://opensource-demo.orangehrmlive.com'),
      apiUrl: EnvironmentUtil.getEnvString('API_URL', 'https://opensource-demo.orangehrmlive.com/web/index.php'),
      environment: EnvironmentUtil.getEnvString('ENVIRONMENT', environment) as any,
      timeoutUi: EnvironmentUtil.getEnvNumber('TIMEOUT_UI', 15000),
      timeoutApi: EnvironmentUtil.getEnvNumber('TIMEOUT_API', 5000),
      debugMode: EnvironmentUtil.getEnvBoolean('DEBUG_MODE', false),
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getEnvironmentConfig(): EnvironmentConfig {
    return this.config;
  }
}
