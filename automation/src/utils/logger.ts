/**
 * Simple Logger implementing the Singleton Pattern.
 * Provides formatted output with timestamps.
 */
export class Logger {
  private static instance: Logger | null = null;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }

  public info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  public warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  public error(message: string, error?: Error): void {
    console.error(this.formatMessage('error', message));
    if (error && error.stack) {
      console.error(error.stack);
    }
  }

  public debug(message: string): void {
    if (process.env.DEBUG_MODE === 'true') {
      console.log(this.formatMessage('debug', message));
    }
  }
}

export const logger = Logger.getInstance();
