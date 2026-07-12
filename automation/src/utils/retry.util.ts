import { logger } from './logger';
import { WaitUtil } from './wait.util';

export class RetryUtil {
  /**
   * Execute an operation with retries.
   */
  public static async retry<T>(
    operation: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${attempt} of ${retries} failed. Retrying in ${delayMs}ms...`);
        if (attempt < retries) {
          await WaitUtil.delay(delayMs);
        }
      }
    }
    logger.error(`All ${retries} attempts failed.`);
    throw lastError;
  }
}
