import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RecurringPaymentPlanPage } from '../pages/RecurringPaymentPlanPage';
import { PaymentPlanSetupPage } from '../pages/PaymentPlanSetupPage';
import { PlanLevelTrackingPage } from '../pages/PlanLevelTrackingPage';
import { PaymentTransactionTrackingPage } from '../pages/PaymentTransactionTrackingPage';
import { NotificationReminderPage } from '../pages/NotificationReminderPage';
import { Logger } from '../utils/logger';
import { FailureAnalyzer } from '../utils/failure-analyzer';
import { TestDataFixtures } from './test-data.fixture';
import { AuthFixtures } from './auth.fixture';
import { TestDataLoader } from '../utils/test-data-loader';
import { env } from '../config/environment';
import fs from 'fs';

export interface PageObjectFixtures {
  loginPage: LoginPage;
  recurringPaymentPlanPage: RecurringPaymentPlanPage;
  paymentPlanSetupPage: PaymentPlanSetupPage;
  planLevelTrackingPage: PlanLevelTrackingPage;
  paymentTransactionTrackingPage: PaymentTransactionTrackingPage;
  notificationReminderPage: NotificationReminderPage;
  logger: Logger;
}

/**
 * Enterprise Base Test Fixture
 * Seamlessly integrates Page Objects, Test Data, Authentication, Structured Logging,
 * and Attempt-Specific Failure Summaries.
 */
export const test = baseTest.extend<PageObjectFixtures & TestDataFixtures & AuthFixtures>({
  // Logger Fixture
  logger: async ({}, use, testInfo) => {
    const logger = new Logger(testInfo.title);
    await use(logger);
  },

  // Page Object Fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  recurringPaymentPlanPage: async ({ page }, use) => {
    await use(new RecurringPaymentPlanPage(page));
  },

  paymentPlanSetupPage: async ({ page }, use) => {
    await use(new PaymentPlanSetupPage(page));
  },

  planLevelTrackingPage: async ({ page }, use) => {
    await use(new PlanLevelTrackingPage(page));
  },

  paymentTransactionTrackingPage: async ({ page }, use) => {
    await use(new PaymentTransactionTrackingPage(page));
  },

  notificationReminderPage: async ({ page }, use) => {
    await use(new NotificationReminderPage(page));
  },

  // Test Data Fixtures
  defaultPatient: async ({}, use) => {
    await use(TestDataLoader.getDefaultPatient());
  },
  defaultCard: async ({}, use) => {
    await use(TestDataLoader.getDefaultCard());
  },
  expiredCard: async ({}, use) => {
    await use(TestDataLoader.getExpiredCard());
  },
  defaultPlanTemplate: async ({}, use) => {
    await use(TestDataLoader.getDefaultPlanTemplate());
  },

  // Auth Fixtures
  authenticatedContext: async ({ browser }, use) => {
    let context;
    if (fs.existsSync(env.STORAGE_STATE_PATH)) {
      context = await browser.newContext({
        storageState: env.STORAGE_STATE_PATH,
        viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
        ignoreHTTPSErrors: true
      });
    } else {
      context = await browser.newContext({
        viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
        ignoreHTTPSErrors: true
      });
    }
    await use(context);
    await context.close();
  },

  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
    await page.close();
  },

  isolatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
      ignoreHTTPSErrors: true
    });
    await use(context);
    await context.close();
  },

  isolatedPage: async ({ isolatedContext }, use) => {
    const page = await isolatedContext.newPage();
    await use(page);
    await page.close();
  },

  // Automatically track test attempts, capture failure screenshots and summaries
  page: async ({ page, logger }, use, testInfo) => {
    // Before test
    logger.info(`Starting attempt ${testInfo.retry + 1} of ${env.RETRIES + 1} for [${testInfo.title}]`);

    await use(page);

    // After test
    if (testInfo.status !== testInfo.expectedStatus) {
      const attemptNum = testInfo.retry + 1;
      const totalAttempts = env.RETRIES + 1;
      const passedOnRetry = testInfo.status === 'passed' && testInfo.retry > 0;

      logger.warn(`Test attempt ${attemptNum} failed: ${testInfo.error?.message}`);

      // Attempt-specific screenshot
      const sanitizedTitle = testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
      const screenshotPath = `test-results/failure_${sanitizedTitle}_attempt_${attemptNum}.png`;

      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});

      // Generate evidence-based failure summary
      FailureAnalyzer.generateSummary({
        testCaseId: testInfo.title.match(/RPP-[A-Z]+-\d+/)?.[0] || 'UNKNOWN_TC',
        testTitle: testInfo.title,
        expectedBehavior: 'Expected step assertions to pass as specified in test case',
        actualObservedBehavior: testInfo.error?.message || 'Action or assertion timed out',
        errorMessage: testInfo.error?.message || 'Unknown test execution error',
        attemptNumber: attemptNum,
        totalAttempts,
        passedOnRetry,
        screenshotPath,
        logs: [testInfo.error?.stack || '']
      });
    }
  }
});

export { expect };
