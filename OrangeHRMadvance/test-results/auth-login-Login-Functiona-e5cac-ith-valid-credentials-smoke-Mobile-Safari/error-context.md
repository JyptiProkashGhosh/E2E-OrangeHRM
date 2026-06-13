# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.ts >> Login Functionality - Negative & Positive >> Should login successfully with valid credentials @smoke
- Location: tests\auth\login.spec.ts:12:7

# Error details

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export abstract class BasePage {
  4  |   readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   /**
  11 |    * Navigates to a specific path using the configured base URL.
  12 |    */
  13 |   async navigate(path: string): Promise<void> {
  14 |     console.log(`[Navigation] Navigating to: ${path}`);
> 15 |     await this.page.goto(path);
     |                     ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  16 |   }
  17 | 
  18 |   /**
  19 |    * Waits for the network to be idle.
  20 |    */
  21 |   async waitForPageLoad(): Promise<void> {
  22 |     await this.page.waitForLoadState('load');
  23 |     await this.page.waitForLoadState('domcontentloaded');
  24 |   }
  25 | 
  26 |   /**
  27 |    * Gets the current page title.
  28 |    */
  29 |   async getTitle(): Promise<string> {
  30 |     return this.page.title();
  31 |   }
  32 | 
  33 |   /**
  34 |    * Takes a full page screenshot and saves it.
  35 |    */
  36 |   async takeScreenshot(name: string): Promise<Buffer> {
  37 |     const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
  38 |     console.log(`[Screenshot] Saving screenshot to: ${screenshotPath}`);
  39 |     return this.page.screenshot({ path: screenshotPath, fullPage: true });
  40 |   }
  41 | 
  42 |   /**
  43 |    * Premium click wrapper with automatic logging and optional click configurations.
  44 |    */
  45 |   async clickElement(locator: Locator, description: string, options?: Parameters<Locator['click']>[0]): Promise<void> {
  46 |     console.log(`[Action] Clicking on: ${description}`);
  47 |     await locator.waitFor({ state: 'visible' });
  48 |     await locator.click(options);
  49 |   }
  50 | 
  51 |   /**
  52 |    * Premium input filler wrapper with automatic logging and clearing.
  53 |    */
  54 |   async fillInput(locator: Locator, text: string, description: string): Promise<void> {
  55 |     console.log(`[Action] Entering text into: ${description}`);
  56 |     await locator.waitFor({ state: 'visible' });
  57 |     await locator.clear();
  58 |     await locator.fill(text);
  59 |   }
  60 | 
  61 |   /**
  62 |    * Premium wait wrapper for checking visibility.
  63 |    */
  64 |   async waitForElementVisible(locator: Locator, timeout = 10000): Promise<void> {
  65 |     await locator.waitFor({ state: 'visible', timeout });
  66 |   }
  67 | 
  68 |   /**
  69 |    * Waits for the global or form-level loading spinner to disappear.
  70 |    */
  71 |   async waitForLoaderToDisappear(): Promise<void> {
  72 |     const loader = this.page.locator('.oxd-form-loader, .oxd-loading-spinner');
  73 |     // First wait a brief moment for the loader to potentially render/appear
  74 |     await this.page.waitForTimeout(300);
  75 |     // Wait for the loader to be hidden/detached
  76 |     await loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {
  77 |       // Ignore if it's already gone or wasn't present
  78 |     });
  79 |   }
  80 | }
  81 | 
```