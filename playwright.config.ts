import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({
  path: process.env.ENV_NAME
    ? `./env-files/.env.${process.env.ENV_NAME}`
    : "./env-files/.env.demo",
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    /* Maximum time for each action such as `click()` in milliseconds */
    actionTimeout: 10000,
  },

  /* Global timeout for each test in milliseconds */
  timeout: 30 * 1000,

  /* Timeout for expect() in milliseconds */
  expect: {
    timeout: 5000,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "always", outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["list"],
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Setup",
      testMatch: "global.setup.ts",
    },
    {
      name: "chromium",
      dependencies: ["Setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./playwright/.auth/auth.json",
      },
    },

    // Uncomment to enable Firefox testing
    // {
    //   name: 'firefox',
    //   dependencies: ['Setup'],
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: "./playwright/.auth/auth.json",
    //   },
    // },

    // Uncomment to enable WebKit (Safari) testing
    // {
    //   name: 'webkit',
    //   dependencies: ['Setup'],
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: "./playwright/.auth/auth.json",
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});

