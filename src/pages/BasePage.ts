import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LocatorHelper } from '../utils/locator-helper';

export abstract class BasePage {
  protected page: Page;
  protected logger: Logger;
  protected locatorHelper: LocatorHelper;

  constructor(page: Page, testCaseId?: string) {
    this.page = page;
    this.logger = new Logger(testCaseId);
    this.locatorHelper = new LocatorHelper(page);
  }

  public getPage(): Page {
    return this.page;
  }

  public async navigateTo(pathOrUrl: string): Promise<void> {
    this.logger.info(`Navigating to ${pathOrUrl}`);
    await this.page.goto(pathOrUrl);
    await this.locatorHelper.waitForPageReady();
  }

  public async getTitle(): Promise<string> {
    return await this.page.title();
  }

  public async captureScreenshot(name: string): Promise<string> {
    const screenshotPath = `screenshots/${name}_${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.logger.info(`Screenshot captured at ${screenshotPath}`);
    return screenshotPath;
  }

  public async getToastMessage(): Promise<string | null> {
    const toast = this.page.locator('.toast, .notification, .alert-box, .mtab-toast');
    if (await toast.isVisible({ timeout: 4000 }).catch(() => false)) {
      return (await toast.textContent())?.trim() || null;
    }
    return null;
  }

  public async waitForSpinnerToDisappear(timeout = 15000): Promise<void> {
    const spinner = this.page.locator('.spinner, .loading-indicator, .mtab-loading');
    if (await spinner.isVisible().catch(() => false)) {
      await spinner.waitFor({ state: 'hidden', timeout }).catch(() => {});
    }
  }
}
