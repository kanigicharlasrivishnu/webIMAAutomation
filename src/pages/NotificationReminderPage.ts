import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotificationReminderPage extends BasePage {
  // Panes
  public notificationPane: Locator;
  public reminderPane: Locator;

  // Event Type Dropdowns
  public notificationEventTypeDropdown: Locator;
  public reminderEventTypeDropdown: Locator;

  // Row Action & Elements
  public addNotificationRowButton: Locator;
  public addReminderRowButton: Locator;
  public notificationRows: Locator;
  public reminderRows: Locator;

  // Row Fields
  public eventDropdown: Locator;
  public modeDropdown: Locator;
  public templateDropdown: Locator;
  public toBeSentDropdown: Locator;
  public toBeSentValueInput: Locator;
  public toBeSentUnitDropdown: Locator;
  public visitTypeDropdown: Locator;
  public providerDropdown: Locator;

  // Scope Switcher
  public scopeGeneralTab: Locator;
  public scopePatientChartTab: Locator;

  // Actions
  public saveButton: Locator;
  public cancelButton: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);

    this.notificationPane = page.locator('.notification-pane, [data-pane="notification"]');
    this.reminderPane = page.locator('.reminder-pane, [data-pane="reminder"]');

    this.notificationEventTypeDropdown = this.notificationPane.locator('select[name="eventType"], [data-field="eventType"]');
    this.reminderEventTypeDropdown = this.reminderPane.locator('select[name="eventType"], [data-field="eventType"]');

    this.addNotificationRowButton = this.notificationPane.getByRole('button', { name: /add/i });
    this.addReminderRowButton = this.reminderPane.getByRole('button', { name: /add/i });

    this.notificationRows = this.notificationPane.locator('.preference-row, tr.data-row');
    this.reminderRows = this.reminderPane.locator('.preference-row, tr.data-row');

    this.eventDropdown = page.locator('select[name="event"], [data-field="event"]');
    this.modeDropdown = page.locator('select[name="mode"], [data-field="mode"]');
    this.templateDropdown = page.locator('select[name="template"], [data-field="template"]');
    this.toBeSentDropdown = page.locator('select[name="toBeSent"], [data-field="toBeSent"]');
    this.toBeSentValueInput = page.locator('input[name="leadTimeValue"], [data-field="leadTimeValue"]');
    this.toBeSentUnitDropdown = page.locator('select[name="leadTimeUnit"], [data-field="leadTimeUnit"]');
    this.visitTypeDropdown = page.locator('select[name="visitType"], [data-field="visitType"]');
    this.providerDropdown = page.locator('select[name="provider"], [data-field="provider"]');

    this.scopeGeneralTab = page.getByRole('tab', { name: /general|clinic default/i });
    this.scopePatientChartTab = page.getByRole('tab', { name: /patient chart/i });

    this.saveButton = page.getByRole('button', { name: /save/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
  }

  public async openPreferences(): Promise<void> {
    this.logger.info('Opening Notification & Reminder Preferences');
    await this.navigateTo(`${this.page.url().split('#')[0]}#/setup/notification-reminder-preferences`);
  }

  public async setNotificationEventType(type: 'Payment Plan' | 'Appointment'): Promise<void> {
    this.logger.info(`Setting Notification Event Type: ${type}`);
    await this.notificationEventTypeDropdown.selectOption({ label: type }).catch(async () => {
      await this.notificationEventTypeDropdown.selectOption({ value: type });
    });
  }

  public async setReminderEventType(type: 'Payment Plan' | 'Appointment'): Promise<void> {
    this.logger.info(`Setting Reminder Event Type: ${type}`);
    await this.reminderEventTypeDropdown.selectOption({ label: type }).catch(async () => {
      await this.reminderEventTypeDropdown.selectOption({ value: type });
    });
  }

  public async addNotificationRow(data: {
    event: string;
    mode: 'All' | 'Call' | 'Email' | 'Text';
    template?: string;
  }): Promise<void> {
    this.logger.info(`Adding notification row: ${JSON.stringify(data)}`);
    await this.locatorHelper.safeClick(this.addNotificationRowButton, 'Add Notification Row');
    const newRow = this.notificationRows.last();
    await newRow.locator('select[name="event"], [data-field="event"]').selectOption({ label: data.event }).catch(() => {});
    await newRow.locator('select[name="mode"], [data-field="mode"]').selectOption({ label: data.mode }).catch(() => {});
    if (data.template) {
      await newRow.locator('select[name="template"], [data-field="template"]').selectOption({ label: data.template }).catch(() => {});
    }
  }

  public async save(): Promise<void> {
    this.logger.info('Saving Notification & Reminder Preferences');
    await this.locatorHelper.safeClick(this.saveButton, 'Save Preferences Button');
    await this.waitForSpinnerToDisappear();
  }
}
