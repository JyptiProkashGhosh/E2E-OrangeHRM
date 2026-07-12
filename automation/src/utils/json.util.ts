import { logger } from './logger';

export class JsonUtil {
  public static safeParse<T>(jsonString: string, fallback: T): T {
    try {
      return JSON.parse(jsonString) as T;
    } catch (e) {
      logger.warn(`Failed to parse JSON string: "${jsonString}". Returning fallback.`);
      return fallback;
    }
  }

  public static stringify(data: any): string {
    try {
      return JSON.stringify(data);
    } catch (e) {
      logger.error('Failed to stringify data object');
      return '';
    }
  }
}
