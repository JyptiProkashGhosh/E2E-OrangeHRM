import { Page } from '@playwright/test';
import * as path from 'path';
import { FileUtil } from './file.util';
import { logger } from './logger';

export class ScreenshotUtil {
  public static async capture(page: Page, screenshotName: string, folder: string = 'screenshots'): Promise<string> {
    try {
      FileUtil.ensureDirExists(folder);
      const fileName = `${screenshotName}_${Date.now()}.png`;
      const filePath = path.join(folder, fileName);
      
      await page.screenshot({ path: filePath, fullPage: true });
      logger.info(`Screenshot captured and saved to: ${filePath}`);
      return filePath;
    } catch (e: any) {
      logger.error(`Failed to capture screenshot: ${e.message}`);
      return '';
    }
  }
}
