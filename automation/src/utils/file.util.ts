import * as fs from 'fs';
import * as path from 'path';
import { logger } from './logger';

export class FileUtil {
  public static readJsonFile<T>(filePath: string): T {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`JSON file not found: ${absolutePath}`);
    }
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  public static writeJsonFile(filePath: string, data: any): void {
    const absolutePath = path.resolve(filePath);
    this.ensureDirExists(path.dirname(absolutePath));
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    logger.debug(`Wrote JSON data to ${absolutePath}`);
  }

  public static readCsvFile<T>(filePath: string): T[] {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`CSV file not found: ${absolutePath}`);
    }
    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const result: T[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, idx) => {
        const val = values[idx];
        if (val !== undefined) {
          if (!isNaN(Number(val)) && val !== '') {
            row[header] = Number(val);
          } else if (val.toLowerCase() === 'true') {
            row[header] = true;
          } else if (val.toLowerCase() === 'false') {
            row[header] = false;
          } else {
            row[header] = val;
          }
        }
      });
      result.push(row as T);
    }
    return result;
  }

  public static ensureDirExists(dirPath: string): void {
    const absolutePath = path.resolve(dirPath);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
  }
}
