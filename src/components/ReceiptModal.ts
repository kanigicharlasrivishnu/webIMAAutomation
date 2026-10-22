import { Page, Locator } from '@playwright/test';
import { LocatorHelper } from '../utils/locator-helper';
import { Logger } from '../utils/logger';

export class ReceiptModal {
  private page: Page;
  private logger: Logger;
  private locatorHelper: LocatorHelper;

  // Modal Locators
  public modalContainer: Locator;
  public receiptNumberText: Locator;
  public amountPaidText: Locator;
  public paymentModeText: Locator;
  public printButton: Locator;
  public deleteButton: Locator;
  public closeButton: Locator;

  constructor(page: Page, testCaseId?: string) {
    this.page = page;
    this.logger = new Logger(testCaseId);
    this.locatorHelper = new LocatorHelper(page);

    this.modalContainer = page.locator('.modal-dialog, .receipt-modal, [role="dialog"]').filter({ hasText: /receipt|payment receipt/i });
    this.receiptNumberText = page.locator('.receipt-no, [data-field="receiptNumber"]');
    this.amountPaidText = page.locator('.receipt-amount, [data-field="amountPaid"]');
    this.paymentModeText = page.locator('.receipt-mode, [data-field="paymentMode"]');
    this.printButton = page.getByRole('button', { name: /print/i });
    this.deleteButton = page.getByRole('button', { name: /delete/i });
    this.closeButton = page.getByRole('button', { name: /close/i }).or(page.locator('.modal-close, [aria-label="Close"]'));
  }

  public async isVisible(): Promise<boolean> {
    return await this.modalContainer.isVisible({ timeout: 5000 });
  }

  public async getReceiptNumber(): Promise<string> {
    return (await this.receiptNumberText.textContent())?.trim() || '';
  }

  public async getAmountPaid(): Promise<string> {
    return (await this.amountPaidText.textContent())?.trim() || '';
  }

  public async print(): Promise<void> {
    this.logger.info('Clicking print receipt');
    await this.locatorHelper.safeClick(this.printButton, 'Print Receipt Button');
  }

  public async deleteReceipt(): Promise<void> {
    this.logger.info('Deleting receipt');
    await this.locatorHelper.safeClick(this.deleteButton, 'Delete Receipt Button');
  }

  public async close(): Promise<void> {
    await this.locatorHelper.safeClick(this.closeButton, 'Close Receipt Button');
  }
}
