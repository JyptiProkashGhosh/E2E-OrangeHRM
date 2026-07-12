import { LaunchOptions } from '@playwright/test';

export const browserConfig = {
  defaultViewport: { width: 1280, height: 720 },
  launchOptions: {
    headless: true,
    slowMo: 0,
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
  } as LaunchOptions,
};
