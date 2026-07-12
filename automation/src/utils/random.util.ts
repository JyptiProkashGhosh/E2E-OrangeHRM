import { StringUtil } from './string.util';

export class RandomUtil {
  public static getRandomName(): { firstName: string; lastName: string } {
    const firstNames = ['John', 'Jane', 'David', 'Sarah', 'Michael', 'Emily', 'Robert', 'Linda'];
    const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Jones'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)] + '_' + StringUtil.generateAlphanumeric(3);
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return { firstName, lastName };
  }

  public static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getRandomJobTitle(): string {
    const jobs = ['QA Engineer', 'Software Developer', 'HR Specialist', 'Product Owner', 'Scrum Master'];
    return jobs[Math.floor(Math.random() * jobs.length)];
  }
}
