import * as fs from 'fs';
import * as path from 'path';

export class Helpers {
  /**
   * Generates a random alphabetic string of specified length.
   */
  static getRandomString(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random numeric string of specified length.
   */
  static getRandomNumberString(length = 6): string {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Dynamically generates a valid dummy text/image file for uploading and returns its absolute path.
   */
  static createDummyUploadFile(fileName = 'dummy_avatar.png'): string {
    const dirPath = path.join(process.cwd(), 'test-data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, fileName);
    // Create a tiny, valid 1x1 transparent PNG data block as buffer or plain content
    const dummyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const buffer = Buffer.from(dummyPngBase64, 'base64');
    
    fs.writeFileSync(filePath, buffer);
    console.log(`[Helpers] Created dummy file at: ${filePath}`);
    return filePath;
  }
}
