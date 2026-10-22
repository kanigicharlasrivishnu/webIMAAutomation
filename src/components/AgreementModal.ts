import { Page, Locator } from '@playwright/test';
import { LocatorHelper } from '../utils/locator-helper';
import { Logger } from '../utils/logger';

export class AgreementModal {
  private page: Page;
  private logger: Logger;
  private locatorHelper: LocatorHelper;

  // Modal Locators
  public modalContainer: Locator;
  public sectionPaymentDetails: Locator;
  public sectionTermsAndConditions: Locator;
  public sectionCancellationPolicy: Locator;
  public sectionElectronicConsent: Locator;
  public sectionExecutionAndAuth: Locator;
  public signatureCanvas: Locator;
  public agreeAndContinueButton: Locator;
  public saveAndCloseButton: Locator;
  public closeButton: Locator;

  constructor(page: Page, testCaseId?: string) {
    this.page = page;
    this.logger = new Logger(testCaseId);
    this.locatorHelper = new LocatorHelper(page);

    this.modalContainer = page.locator('.modal-dialog, .agreement-modal, [role="dialog"]').filter({ hasText: /payment plan agreement|agreement/i });
    this.sectionPaymentDetails = page.locator('.section-payment-details, [data-section="payment-details"], h3:has-text("Payment Details"), h4:has-text("Payment Details")');
    this.sectionTermsAndConditions = page.locator('.section-terms, [data-section="terms"], h3:has-text("Terms & Conditions"), h4:has-text("Terms & Conditions")');
    this.sectionCancellationPolicy = page.locator('.section-cancellation, [data-section="cancellation"], h3:has-text("Cancellation Policy"), h4:has-text("Cancellation Policy")');
    this.sectionElectronicConsent = page.locator('.section-consent, [data-section="consent"], h3:has-text("Electronic Communications Consent"), h4:has-text("Electronic Communications Consent")');
    this.sectionExecutionAndAuth = page.locator('.section-execution, [data-section="execution"], h3:has-text("Execution & Authorization"), h4:has-text("Execution & Authorization")');

    this.signatureCanvas = page.locator('canvas.signature-pad, .signature-area');
    this.agreeAndContinueButton = page.getByRole('button', { name: /agree & continue|agree and continue/i });
    this.saveAndCloseButton = page.getByRole('button', { name: /save and close|save & close/i });
    this.closeButton = page.locator('.modal-close, button.close, [aria-label="Close"]');
  }

  public async isVisible(): Promise<boolean> {
    return await this.modalContainer.isVisible({ timeout: 5000 });
  }

  public async drawSignature(): Promise<void> {
    this.logger.info('Drawing signature in signature box');
    if (await this.signatureCanvas.isVisible().catch(() => false)) {
      const box = await this.signatureCanvas.boundingBox();
      if (box) {
        await this.page.mouse.move(box.x + 20, box.y + 20);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + 80, box.y + 40);
        await this.page.mouse.up();
      }
    }
  }

  public async clickAgreeAndContinue(): Promise<void> {
    this.logger.info('Clicking Agree & Continue on Agreement');
    await this.locatorHelper.safeClick(this.agreeAndContinueButton, 'Agree & Continue Button');
  }

  public async clickSaveAndClose(): Promise<void> {
    this.logger.info('Clicking Save and Close on Agreement');
    await this.locatorHelper.safeClick(this.saveAndCloseButton, 'Save and Close Button');
  }

  public async closeWithoutAgreeing(): Promise<void> {
    this.logger.info('Closing Agreement modal without agreeing');
    await this.locatorHelper.safeClick(this.closeButton, 'Modal Close (X) Button');
  }
}
