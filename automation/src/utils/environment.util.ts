export class EnvironmentUtil {
  public static getEnvString(key: string, defaultValue: string): string {
    return process.env[key] !== undefined ? (process.env[key] as string) : defaultValue;
  }

  public static getEnvNumber(key: string, defaultValue: number): number {
    const val = process.env[key];
    if (val === undefined) return defaultValue;
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  public static getEnvBoolean(key: string, defaultValue: boolean): boolean {
    const val = process.env[key];
    if (val === undefined) return defaultValue;
    return val.toLowerCase() === 'true';
  }
}
