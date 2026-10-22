import { Page, Locator, expect } from '@playwright/test';
import { LocatorHelper } from '../utils/locator-helper';
import { Logger } from '../utils/logger';

export class PayNowModal {
  private page: Page;
  private logger: Logger;
  private locatorHelper: LocatorHelper;

  // Modal Locators
  public modalContainer: Locator;
  public optionPayOverdue: Locator;
  public optionPayNextInstallment: Locator;
  public optionPayTotalBalance: Locator;
  public optionCustomPayment: Locator;
  public amountInput: Locator;
  public paymentMethodDropdown: Locator;
  public submitButton: Locator;
  public cancelButton: Locator;
  public validationMessage: Locator;

  constructor(page: Page, testCaseId?: string) {
    this.page = page;
    this.logger = new Logger(testCaseId);
    this.locatorHelper = new LocatorHelper(page);

    this.modalContainer = page.locator('.modal-dialog, .pay-now-modal, [role="dialog"]').filter({ hasText: /pay now/i });
    this.optionPayOverdue = page.getByRole('radio', { name: /pay overdue/i }).or(page.getByLabel(/pay overdue/i)).or(page.getByText('Pay Overdue'));
    this.optionPayNextInstallment = page.getByRole('radio', { name: /pay next installment/i }).or(page.getByLabel(/pay next installment/i)).or(page.getByText('Pay Next Installment'));
    this.optionPayTotalBalance = page.getByRole('radio', { name: /pay total balance/i }).or(page.getByLabel(/pay total balance/i)).or(page.getByText('Pay Total Balance'));
    this.optionCustomPayment = page.getByRole('radio', { name: /custom payment/i }).or(page.getByLabel(/custom payment/i)).or(page.getByText('Custom Payment'));

    this.amountInput = page.locator('input[name="amount"], input#pay-now-amount, input.pay-amount');
    this.paymentMethodDropdown = page.locator('select[name="paymentMethod"], .payment-method-select');
    this.submitButton = page.getByRole('button', { name: /pay|submit|process payment/i });
    this.cancelButton = page.getByRole('button', { name: /cancel|close/i });
    this.validationMessage = page.locator('.error-message, .validation-error, .invalid-feedback');
  }

  public async isVisible(): Promise<boolean> {
    return await this.modalContainer.isVisible({ timeout: 5000 });
  }

  public async selectPaymentOption(option: 'Overdue' | 'NextInstallment' | 'TotalBalance' | 'Custom'): Promise<void> {
    this.logger.info(`Selecting Pay Now option: ${option}`);
    switch (option) {
      case 'Overdue':
        await this.locatorHelper.safeClick(this.optionPayOverdue, 'Pay Overdue Option');
        break;
      case 'NextInstallment':
        await this.locatorHelper.safeClick(this.optionPayNextInstallment, 'Pay Next Installment Option');
        break;
      case 'TotalBalance':
        await this.locatorHelper.safeClick(this.optionPayTotalBalance, 'Pay Total Balance Option');
        break;
      case 'Custom':
        await this.locatorHelper.safeClick(this.optionCustomPayment, 'Custom Payment Option');
        break;
    }
  }

  public async getAmountValue(): Promise<string> {
    return (await this.amountInput.inputValue()) || '';
  }

  public async enterCustomAmount(amount: string | number): Promise<void> {
    this.logger.info(`Entering custom payment amount: ${amount}`);
    await this.locatorHelper.safeFill(this.amountInput, String(amount), 'Custom Amount Input');
  }

  public async submit(): Promise<void> {
    this.logger.info('Submitting payment');
    await this.locatorHelper.safeClick(this.submitButton, 'Submit Payment Button');
  }

  public async cancel(): Promise<void> {
    await this.locatorHelper.safeClick(this.cancelButton, 'Cancel Payment Button');
  }
}
