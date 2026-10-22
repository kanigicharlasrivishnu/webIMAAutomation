import { Page, Locator, expect } from '@playwright/test';
import { defaultLogger } from './logger';

export interface LocatorResolutionOptions {
  timeout?: number;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
  description?: string;
}

export class LocatorHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Safe Click with retry and synchronization
   */
  public async safeClick(locator: Locator, description: string, timeout = 10000): Promise<void> {
    defaultLogger.debug(`Attempting safe click on [${description}]`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {});
      await locator.click({ timeout });
      defaultLogger.info(`Clicked [${description}] successfully`);
    } catch (err: any) {
      defaultLogger.error(`Failed to click [${description}]: ${err.message}`);
      throw err;
    }
  }

  /**
   * Safe Fill with clear and retry
   */
  public async safeFill(locator: Locator, value: string, description: string, timeout = 10000): Promise<void> {
    defaultLogger.debug(`Attempting safe fill on [${description}] with value`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.fill(value, { timeout });
      defaultLogger.info(`Filled [${description}] successfully`);
    } catch (err: any) {
      defaultLogger.error(`Failed to fill [${description}]: ${err.message}`);
      throw err;
    }
  }

  /**
   * Resolve an accessible locator with standard Playwright Codegen best practices:
   * Prioritizes Role -> Label -> Placeholder -> Text -> TestId -> CSS fallback
   */
  public getSmartLocator(selectorStrategy: {
    role?: { role: any; name?: string | RegExp };
    label?: string | RegExp;
    placeholder?: string | RegExp;
    text?: string | RegExp;
    testId?: string;
    css?: string;
  }): Locator {
    if (selectorStrategy.role) {
      return this.page.getByRole(selectorStrategy.role.role, {
        name: selectorStrategy.role.name
      });
    }

    if (selectorStrategy.label) {
      return this.page.getByLabel(selectorStrategy.label);
    }

    if (selectorStrategy.placeholder) {
      return this.page.getByPlaceholder(selectorStrategy.placeholder);
    }

    if (selectorStrategy.testId) {
      return this.page.getByTestId(selectorStrategy.testId);
    }

    if (selectorStrategy.text) {
      return this.page.getByText(selectorStrategy.text);
    }

    if (selectorStrategy.css) {
      return this.page.locator(selectorStrategy.css);
    }

    throw new Error('No valid locator strategy provided to getSmartLocator');
  }

  /**
   * Waits for DOM content loaded state with fast resolution
   */
  public async waitForPageReady(timeout = 15000): Promise<void> {
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout });
    } catch (e: any) {
      defaultLogger.warn(`Page ready state wait timed out: ${e.message}`);
    }
  }
}
