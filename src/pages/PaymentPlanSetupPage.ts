import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/environment';

export class PaymentPlanSetupPage extends BasePage {
  // Master List (Left Pane) Locators
  public leftPaneContainer: Locator;
  public searchInput: Locator;
  public planCodeListRows: Locator;
  public paginationNextButton: Locator;
  public paginationPrevButton: Locator;
  public paginationInfo: Locator;

  // Detail Form (Right Pane) Locators
  public rightPaneContainer: Locator;
  public planCodeInput: Locator;
  public descriptionInput: Locator;
  public amountInput: Locator;
  public noteInput: Locator;
  public activeCheckbox: Locator;

  // Due On Controls
  public dueOnFrequencyDropdown: Locator;
  public everyNInput: Locator;
  public lastDayOfMonthCheckbox: Locator;
  public weekdaySelector: Locator;

  // Action Buttons
  public addNewButton: Locator;
  public saveButton: Locator;
  public cancelButton: Locator;
  public deleteButton: Locator;
  public validationErrorMessage: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);

    // Left Pane
    this.leftPaneContainer = page.locator('.setup-left-pane, .plan-code-master-list');
    this.searchInput = page.locator('.setup-search-input, input[placeholder*="Search"]');
    this.planCodeListRows = page.locator('.plan-code-master-list tbody tr, .setup-left-pane .list-item');
    this.paginationNextButton = page.locator('.pagination .next-btn, [aria-label="Next page"]');
    this.paginationPrevButton = page.locator('.pagination .prev-btn, [aria-label="Previous page"]');
    this.paginationInfo = page.locator('.pagination-info, .record-count');

    // Right Pane Form
    this.rightPaneContainer = page.locator('.setup-right-pane, .plan-code-detail-form');
    this.planCodeInput = page.locator('input[name="planCode"], [data-field="planCode"]');
    this.descriptionInput = page.locator('input[name="description"], [data-field="description"]');
    this.amountInput = page.locator('input[name="amount"], [data-field="amount"]');
    this.noteInput = page.locator('textarea[name="note"], [data-field="note"]');
    this.activeCheckbox = page.locator('input[name="isActive"], [data-field="isActive"]');

    // Due On
    this.dueOnFrequencyDropdown = page.locator('select[name="frequency"], [data-field="frequency"]');
    this.everyNInput = page.locator('input[name="everyN"], [data-field="everyN"]');
    this.lastDayOfMonthCheckbox = page.locator('input[name="lastDayOfMonth"], [data-field="lastDayOfMonth"]');
    this.weekdaySelector = page.locator('.weekday-picker, [data-field="weekdays"]');

    // Actions
    this.addNewButton = page.getByRole('button', { name: /add|new template/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
    this.deleteButton = page.getByRole('button', { name: /delete/i });
    this.validationErrorMessage = page.locator('.alert-danger, .validation-message, .field-error');
  }

  public async openSetup(): Promise<void> {
    this.logger.info('Opening Recurring Payment Plan Setup');
    const currentUrl = this.page.url();
    const baseUrl = currentUrl === 'about:blank' ? env.BASE_URL : currentUrl;
    await this.navigateTo(`${baseUrl.split('#')[0]}#/setup/recurring-payment-plan`);
  }

  public async searchPlanCode(query: string): Promise<void> {
    this.logger.info(`Searching setup templates for: ${query}`);
    await this.locatorHelper.safeFill(this.searchInput, query, 'Left Search Box');
    await this.page.keyboard.press('Enter');
  }

  public async selectPlanCodeFromList(code: string): Promise<void> {
    this.logger.info(`Selecting template [${code}] from master list`);
    const item = this.planCodeListRows.filter({ hasText: new RegExp(code, 'i') }).first();
    await this.locatorHelper.safeClick(item, `Template Code: ${code}`);
  }

  public async clickAddNew(): Promise<void> {
    this.logger.info('Clicking Add New Template');
    await this.locatorHelper.safeClick(this.addNewButton, 'Add New Template Button');
  }

  public async fillTemplate(data: {
    planCode?: string;
    description?: string;
    amount?: number | string;
    note?: string;
    frequency?: string;
    everyN?: number | string;
    isActive?: boolean;
    lastDayOfMonth?: boolean;
  }): Promise<void> {
    this.logger.info(`Filling template setup form: ${JSON.stringify(data)}`);

    if (data.planCode !== undefined) {
      await this.locatorHelper.safeFill(this.planCodeInput, data.planCode, 'Plan Code Input');
    }
    if (data.description !== undefined) {
      await this.locatorHelper.safeFill(this.descriptionInput, data.description, 'Description Input');
    }
    if (data.amount !== undefined) {
      await this.locatorHelper.safeFill(this.amountInput, String(data.amount), 'Amount Input');
    }
    if (data.note !== undefined) {
      await this.locatorHelper.safeFill(this.noteInput, data.note, 'Note Textarea');
    }
    if (data.frequency) {
      await this.dueOnFrequencyDropdown.selectOption(data.frequency);
    }
    if (data.everyN !== undefined) {
      await this.locatorHelper.safeFill(this.everyNInput, String(data.everyN), 'Every N Input');
    }
    if (data.lastDayOfMonth !== undefined) {
      const isChecked = await this.lastDayOfMonthCheckbox.isChecked().catch(() => false);
      if (isChecked !== data.lastDayOfMonth) {
        await this.lastDayOfMonthCheckbox.click();
      }
    }
  }

  public async save(): Promise<void> {
    this.logger.info('Saving setup template');
    await this.locatorHelper.safeClick(this.saveButton, 'Save Template Button');
    await this.waitForSpinnerToDisappear();
  }

  public async cancel(): Promise<void> {
    this.logger.info('Canceling setup edits');
    await this.locatorHelper.safeClick(this.cancelButton, 'Cancel Button');
  }

  public async deleteTemplate(): Promise<void> {
    this.logger.info('Deleting setup template');
    await this.locatorHelper.safeClick(this.deleteButton, 'Delete Button');
  }
}
