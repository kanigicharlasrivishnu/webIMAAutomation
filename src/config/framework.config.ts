import path from 'path';
import { env } from './environment';

export const frameworkConfig = {
  projectRoot: path.resolve(__dirname, '..', '..'),
  paths: {
    testCasesOriginal: path.resolve(__dirname, '..', '..', 'test-cases', 'original'),
    testCasesParsed: path.resolve(__dirname, '..', '..', 'test-cases', 'parsed'),
    testCaseMapping: path.resolve(__dirname, '..', '..', 'test-cases', 'test-case-mapping'),
    testsGenerated: path.resolve(__dirname, '..', '..', 'tests', 'generated'),
    testsRegression: path.resolve(__dirname, '..', '..', 'tests', 'regression'),
    authDir: path.resolve(__dirname, '..', '..', 'auth'),
    storageState: env.STORAGE_STATE_PATH,
    logsDir: path.resolve(__dirname, '..', '..', 'logs'),
    screenshotsDir: path.resolve(__dirname, '..', '..', 'screenshots'),
    testResultsDir: path.resolve(__dirname, '..', '..', 'test-results'),
    playwrightReportDir: path.resolve(__dirname, '..', '..', 'playwright-report'),
    allureResultsDir: path.resolve(__dirname, '..', '..', 'allure-results'),
    allureReportDir: path.resolve(__dirname, '..', '..', 'allure-report'),
    testDataDir: path.resolve(__dirname, '..', '..', 'test-data')
  },
  execution: {
    browser: env.BROWSER,
    headless: env.HEADLESS,
    viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
    workers: env.WORKERS,
    // Explicit 5 retries requirement: 1 initial attempt + 5 retries = 6 attempts max
    retries: env.RETRIES,
    timeouts: {
      default: env.DEFAULT_TIMEOUT,
      expect: env.EXPECT_TIMEOUT,
      action: env.ACTION_TIMEOUT,
      navigation: env.NAVIGATION_TIMEOUT
    }
  },
  healing: {
    mode: env.HEALING_MODE, // 'off' | 'suggest' (default) | 'approved'
    proposalThreshold: 0.70, // minimum similarity/confidence for proposal
    maxHealingHistory: 100,
    storeProposalsPath: path.resolve(__dirname, '..', '..', 'logs', 'healing-proposals.json')
  },
  reporting: {
    allure: true,
    html: true,
    jsonSummary: true
  }
};
