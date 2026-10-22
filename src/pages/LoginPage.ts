import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/environment';

export class LoginPage extends BasePage {
  // Locators
  private clinicInput: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private userAvatar: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);
    this.clinicInput = page.locator('#clinic').getByRole('textbox').or(page.getByPlaceholder('Clinic', { exact: false })).or(page.locator('input[name="clinic"]'));
    this.usernameInput = page.locator('#username').getByRole('textbox').or(page.getByPlaceholder('Username', { exact: false })).or(page.locator('input[name="username"]'));
    this.passwordInput = page.locator('input[type="PASSWORD"], input[type="password"]');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.userAvatar = page.locator('.user-profile, .mtab-user-avatar, #header-user-info');
  }

  public async goto(): Promise<void> {
    await this.navigateTo(env.BASE_URL);
  }

  public async login(
    clinic = env.CLINIC,
    username = env.USERNAME,
    password = env.PASSWORD
  ): Promise<void> {
    this.logger.info(`Performing login for clinic [${clinic}] user [${username}]`);

    await this.locatorHelper.safeFill(this.clinicInput, clinic, 'Clinic Code');
    await this.clinicInput.press('Tab').catch(() => {});

    await this.locatorHelper.safeFill(this.usernameInput, username, 'Username');
    await this.usernameInput.press('Tab').catch(() => {});

    await this.locatorHelper.safeFill(this.passwordInput, password, 'Password');

    await this.locatorHelper.safeClick(this.loginButton, 'Login Button');
    await this.waitForSpinnerToDisappear();
  }

  public async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForURL((url) => !url.href.includes('/login'), { timeout: 15000 });
      return true;
    } catch {
      return !this.page.url().includes('/login');
    }
  }

  public async saveStorageState(storageStatePath = env.STORAGE_STATE_PATH): Promise<void> {
    this.logger.info(`Saving session storage state to ${storageStatePath}`);
    await this.page.context().storageState({ path: storageStatePath });
  }
}
