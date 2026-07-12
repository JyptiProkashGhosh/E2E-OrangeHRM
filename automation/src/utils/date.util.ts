export class DateUtil {
  public static getTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '');
  }

  public static formatDate(date: Date, separator: string = '-'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${separator}${month}${separator}${day}`;
  }

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
