import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class BrowserManager {
  private static instance: BrowserManager | null = null;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  private constructor() {}

  public static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  public async getPage(): Promise<Page> {
    if (this.page && !this.page.isClosed()) {
      return this.page;
    }
    return this.initPage();
  }

  public async getContext(): Promise<BrowserContext> {
    if (this.context) {
      return this.context;
    }
    await this.getPage();
    return this.context!;
  }

  private async initPage(): Promise<Page> {
    if (!this.browser) {
      const headless = process.env.MCP_PLAYWRIGHT_HEADLESS !== 'false';
      this.browser = await chromium.launch({
        headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });
    }

    if (!this.context) {
      this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
    }

    this.page = await this.context.newPage();
    
    // Set default timeouts (30 seconds)
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);

    // Listen to console errors and log them
    this.page.on('console', (msg) => {
      if (process.env.MCP_PLAYWRIGHT_DEBUG === 'true') {
        console.error(`[Browser Console] [${msg.type()}] ${msg.text()}`);
      }
    });

    this.page.on('pageerror', (err) => {
      console.error(`[Browser PageError] ${err.message}`);
    });

    return this.page;
  }

  public async close(): Promise<void> {
    if (this.page) {
      try {
        await this.page.close();
      } catch (e) {}
      this.page = null;
    }
    if (this.context) {
      try {
        await this.context.close();
      } catch (e) {}
      this.context = null;
    }
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (e) {}
      this.browser = null;
    }
  }
}
