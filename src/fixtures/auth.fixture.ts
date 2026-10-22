import { test as base, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import { env } from '../config/environment';
import { LoginPage } from '../pages/LoginPage';
import { defaultLogger } from '../utils/logger';

export interface AuthFixtures {
  authenticatedContext: BrowserContext;
  authenticatedPage: Page;
  isolatedContext: BrowserContext;
  isolatedPage: Page;
}

export const authFixture = base.extend<AuthFixtures>({
  authenticatedContext: async ({ browser }, use) => {
    let context: BrowserContext;

    if (fs.existsSync(env.STORAGE_STATE_PATH)) {
      defaultLogger.info(`Reusing authenticated storage state from ${env.STORAGE_STATE_PATH}`);
      context = await browser.newContext({
        storageState: env.STORAGE_STATE_PATH,
        viewport: { width: env.VIEWPORT_WIDTH, height: env.VIEWPORT_HEIGHT },
        ignoreHTTPSErrors: true
      });
    } else {
      defaultLogger.warn('No pre-existing storage state found. Spawning fresh isolated session.');
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
    defaultLogger.info('Creating completely isolated, non-shared browser context.');
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
  }
});
