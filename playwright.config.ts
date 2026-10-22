import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/environment';
import path from 'path';

/**
 * Enterprise Playwright Framework Configuration
 * - Retries: 5 (1 initial attempt + 5 retries = 6 attempts max)
 * - Trace: retain-on-failure
 * - Screenshot: only-on-failure
 * - Dual Reporters: HTML + Allure
 * - Secure Storage State authentication workflow
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: env.DEFAULT_TIMEOUT,
  expect: {
    timeout: env.EXPECT_TIMEOUT
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /*
   * Retry policy: 5 retries (1 initial attempt + 5 retries = 6 maximum attempts).
   * Configurable via RETRIES in .env.
   */
  retries: env.RETRIES,
  /* Opt out of parallel tests on CI if needed */
  workers: env.WORKERS,
  /* Reporter to use. Dual Allure and Playwright HTML reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
        environmentInfo: {
          NODE_VERSION: process.version,
          OS: process.platform,
          BASE_URL: env.BASE_URL,
          CLINIC: env.CLINIC,
          BROWSER: env.BROWSER,
          RETRIES: String(env.RETRIES),
          HEALING_MODE: env.HEALING_MODE
        }
      }
    ]
  ],
  /* Shared settings for all the projects below */
  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,
    viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
    actionTimeout: env.ACTION_TIMEOUT,
    navigationTimeout: env.NAVIGATION_TIMEOUT,
    /* Collect trace when retrying the failed test */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: process.argv.includes('--headed') ? 600 : 0
    }
  },

  /* Configure projects for major browsers & Auth Setup */
  projects: [
    // Setup project for generating reusable authentication state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome']
      }
    },

    // Chromium standard suite with auth state reuse
    {
      name: 'chromium',
      testDir: './tests',
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, 'auth', 'user-state.json')
      },
      dependencies: ['setup']
    },

    // No-auth suite for login & guest flows
    {
      name: 'no-auth',
      testDir: './tests',
      testMatch: /.*login.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],

  /* Folder for test artifacts such as screenshots, videos, traces */
  outputDir: 'test-results/'
});
