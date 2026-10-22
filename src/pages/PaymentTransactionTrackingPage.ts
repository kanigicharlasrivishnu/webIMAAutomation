import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentTransactionTrackingPage extends BasePage {
  // Grid Locators
  public gridContainer: Locator;
  public transactionRows: Locator;
  public pinnedGrandTotalRow: Locator;

  // Filter Pane Locators
  public planCodeFilter: Locator;
  public transactionStatusFilter: Locator;
  public unappliedOnlyCheckbox: Locator;
  public dateFromInput: Locator;
  public dateToInput: Locator;
  public applyFilterButton: Locator;
  public resetFilterButton: Locator;

  // Row Actions
  public refundActionButton: Locator;
  public viewRequestContentButton: Locator;
  public viewStatusHistoryButton: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);

    this.gridContainer = page.locator('.transaction-tracking-grid, #txn-tracking-table');
    this.transactionRows = page.locator('.transaction-tracking-grid tbody tr, .txn-grid tr.data-row');
    this.pinnedGrandTotalRow = page.locator('.pinned-grand-total, tfoot tr.grand-total');

    this.planCodeFilter = page.locator('select[name="filterPlanCode"], [data-filter="planCode"], input[name="filterPlanCode"]');
    this.transactionStatusFilter = page.locator('select[name="filterTxnStatus"], [data-filter="txnStatus"]');
    this.unappliedOnlyCheckbox = page.locator('input[name="unappliedOnly"], [data-filter="unappliedOnly"]');
    this.dateFromInput = page.locator('input[name="txnDateFrom"], [data-filter="txnDateFrom"]');
    this.dateToInput = page.locator('input[name="txnDateTo"], [data-filter="txnDateTo"]');
    this.applyFilterButton = page.getByRole('button', { name: /search|apply/i });
    this.resetFilterButton = page.getByRole('button', { name: /reset/i });

    this.refundActionButton = page.getByRole('button', { name: /refund/i });
    this.viewRequestContentButton = page.getByRole('button', { name: /request content|view request/i });
    this.viewStatusHistoryButton = page.getByRole('button', { name: /status history|history/i });
  }

  public async openStandalone(): Promise<void> {
    this.logger.info('Opening Payment Transaction Tracking standalone');
    await this.navigateTo(`${this.page.url().split('#')[0]}#/tracking/payment-transactions`);
  }

  public async filterByStatus(status: 'Successful' | 'Failed' | 'In queue' | 'In progress'): Promise<void> {
    this.logger.info(`Filtering transactions by status: ${status}`);
    await this.transactionStatusFilter.selectOption({ label: status }).catch(async () => {
      await this.transactionStatusFilter.selectOption({ value: status });
    });
    await this.locatorHelper.safeClick(this.applyFilterButton, 'Apply Filters Button');
    await this.waitForSpinnerToDisappear();
  }

  public async filterByPlanCode(code: string): Promise<void> {
    this.logger.info(`Filtering transactions by Plan Code: ${code}`);
    await this.locatorHelper.safeFill(this.planCodeFilter, code, 'Plan Code Filter');
    await this.locatorHelper.safeClick(this.applyFilterButton, 'Apply Filters Button');
    await this.waitForSpinnerToDisappear();
  }

  public async toggleUnappliedOnly(enable = true): Promise<void> {
    this.logger.info(`Toggling Unapplied-only filter to: ${enable}`);
    const isChecked = await this.unappliedOnlyCheckbox.isChecked().catch(() => false);
    if (isChecked !== enable) {
      await this.unappliedOnlyCheckbox.click();
      await this.locatorHelper.safeClick(this.applyFilterButton, 'Apply Filters Button');
      await this.waitForSpinnerToDisappear();
    }
  }

  public async initiateRefund(receiptNo: string): Promise<void> {
    this.logger.info(`Initiating refund for transaction receipt [${receiptNo}]`);
    const row = this.transactionRows.filter({ hasText: receiptNo }).first();
    await row.click();
    await this.locatorHelper.safeClick(this.refundActionButton, 'Refund Action Button');
  }
}
