import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PayNowModal } from '../components/PayNowModal';
import { AgreementModal } from '../components/AgreementModal';
import { ReceiptModal } from '../components/ReceiptModal';
import { TestPlanData } from '../utils/test-data-loader';

export class RecurringPaymentPlanPage extends BasePage {
  // Modals
  public payNowModal: PayNowModal;
  public agreementModal: AgreementModal;
  public receiptModal: ReceiptModal;

  // Window & List View Locators
  public windowContainer: Locator;
  public addPaymentPlanButton: Locator;
  public planListRows: Locator;
  public pinnedGrandTotalRow: Locator;

  // Form Locators (Create / Edit View inside Patient Payment Plan Setup Modal)
  public modalContainer: Locator;
  public planCodeDropdown: Locator;
  public descriptionInput: Locator;
  public amountInput: Locator;
  public noteInput: Locator;
  public startDateInput: Locator;
  public dailyFrequencyTab: Locator;
  public weeklyFrequencyTab: Locator;
  public monthlyFrequencyTab: Locator;
  public yearlyFrequencyTab: Locator;
  public endsOnRadio: Locator;
  public endsAfterRadio: Locator;
  public neverEndsRadio: Locator;
  public cashPlanCheckbox: Locator;
  public savedCardDropdown: Locator;
  public addNewCardButton: Locator;
  public reconciliationPreferenceDropdown: Locator;

  // Action Buttons
  public activeCheckbox: Locator;
  public resetButton: Locator;
  public saveButton: Locator;
  public saveAndCloseButton: Locator;
  public deleteButton: Locator;
  public printButton: Locator;
  public payNowButton: Locator;
  public agreementButton: Locator;
  public modalCloseButton: Locator;

  // Installments Section
  public installmentsTable: Locator;
  public installmentRows: Locator;
  public installmentsNeverEndsNote: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);
    this.payNowModal = new PayNowModal(page, testCaseId);
    this.agreementModal = new AgreementModal(page, testCaseId);
    this.receiptModal = new ReceiptModal(page, testCaseId);

    // List view
    this.windowContainer = page.locator('body');
    this.addPaymentPlanButton = page.getByRole('button', { name: /add payment plan/i }).or(page.locator('button:has-text("Add Payment Plan")'));
    this.planListRows = page.locator('.item-container.ui-grid-row');
    this.pinnedGrandTotalRow = page.locator('.pinned-grand-total, tfoot tr.grand-total');

    // Create / Edit Modal Form
    this.modalContainer = page.locator('.modal-dialog, [role="dialog"], .mtab-modal-dialog').filter({ hasText: /patient payment plan setup/i });
    this.planCodeDropdown = page.locator('mtab-select[formcontrolname="planCode"], select[name="planCode"], [data-field="planCode"]').or(page.locator('.plan-code-select'));
    this.descriptionInput = page.locator('input[formcontrolname="description"], input[name="description"]');
    this.amountInput = page.locator('input[formcontrolname="amount"], input[name="amount"]');
    this.noteInput = page.locator('textarea[formcontrolname="note"], textarea[name="note"]');
    this.startDateInput = page.locator('input[formcontrolname="startDate"], input[placeholder*="Date"]');

    // Due On Frequencies
    this.dailyFrequencyTab = page.locator('a, button, li').filter({ hasText: /^Daily$/i });
    this.weeklyFrequencyTab = page.locator('a, button, li').filter({ hasText: /^Weekly$/i });
    this.monthlyFrequencyTab = page.locator('a, button, li').filter({ hasText: /^Monthly$/i });
    this.yearlyFrequencyTab = page.locator('a, button, li').filter({ hasText: /^Yearly$/i });

    this.endsOnRadio = page.getByLabel(/ends on/i).or(page.locator('input[type="radio"][value="endsOn"]'));
    this.endsAfterRadio = page.getByLabel(/ends after/i).or(page.locator('input[type="radio"][value="endsAfter"]'));
    this.neverEndsRadio = page.getByLabel(/never ends/i).or(page.locator('input[type="radio"][value="neverEnds"]'));

    // Payment Method & Reconciliation
    this.cashPlanCheckbox = page.getByLabel(/cash plan/i).or(page.locator('input[name="cashPlan"]')).or(page.locator('input[type="checkbox"]').filter({ hasText: /cash plan/i }));
    this.savedCardDropdown = page.locator('mtab-select[formcontrolname="savedCard"], select[name="savedCard"]');
    this.addNewCardButton = page.getByRole('button', { name: /\+ add new card/i });
    this.reconciliationPreferenceDropdown = page.locator('mtab-select[formcontrolname="reconciliationPreference"], select[name="reconciliationPreference"]');

    // Actions
    this.activeCheckbox = page.getByLabel(/active/i).or(page.locator('input[type="checkbox"][name="isActive"]'));
    this.resetButton = page.getByRole('button', { name: /^reset$/i });
    this.saveButton = page.getByRole('button', { name: /^save$/i });
    this.saveAndCloseButton = page.getByRole('button', { name: /^save & close$/i });
    this.deleteButton = page.getByRole('button', { name: /^delete$/i });
    this.printButton = page.getByRole('button', { name: /^print$/i });
    this.payNowButton = page.getByRole('button', { name: /^pay now$/i });
    this.agreementButton = page.getByRole('button', { name: /^agreement$/i });
    this.modalCloseButton = page.getByRole('button', { name: /^close$/i }).or(page.locator('.modal-close, [aria-label="Close"]'));

    // Installments
    this.installmentsTable = page.locator('.installments-table, table').filter({ hasText: /due date|amount due|balance/i });
    this.installmentRows = this.installmentsTable.locator('tbody tr');
    this.installmentsNeverEndsNote = page.locator('text="Previewing the first 12 installments"');
  }

  /**
   * Navigate to patient payment plan screen via direct URL
   */
  public async openForPatient(patientId = '10003171895'): Promise<void> {
    const idToUse = (!patientId || patientId.startsWith('PAT')) ? '10003171895' : patientId;
    this.logger.info(`Opening Payment Plan for patient [${idToUse}]`);
    await this.page.goto(`https://webims.meditab.local/#/app/patient/edit/${idToUse}/payment-plan`, { waitUntil: 'domcontentloaded' });
    await this.waitForSpinnerToDisappear();
  }

  /**
   * Navigate via UI clicks: Click top nav Patient -> Select Patient -> Click Payment Plan
   */
  public async openViaPatientMenu(patientNameOrChart = 'Accept, Test'): Promise<void> {
    this.logger.info(`Opening Payment Plan via UI navigation: Patient > Select Patient > Payment Plan`);
    
    // Top nav Patient icon
    const patientNavIcon = this.page.locator('a[automationid="PATIENT"], .mt-icon-patient, [title*="Patient"]').first();
    if (await patientNavIcon.isVisible({ timeout: 4000 }).catch(() => false)) {
      await this.locatorHelper.safeClick(patientNavIcon, 'Top Nav Patient Icon');
      await this.page.waitForTimeout(1000);
    } else {
      await this.page.goto('https://webims.meditab.local/#/app/patient', { waitUntil: 'domcontentloaded' });
    }

    // Select patient from list
    const patientRow = this.page.locator('table tbody tr').filter({ hasText: patientNameOrChart }).first();
    await patientRow.waitFor({ state: 'visible', timeout: 10000 });
    const patientLink = patientRow.locator('td a, td').first();
    await this.locatorHelper.safeClick(patientLink, `Patient: ${patientNameOrChart}`);
    await this.page.waitForTimeout(1500);

    // Click Payment Plan in left menu
    const paymentPlanMenu = this.page.locator('a:has-text("Payment Plan")').first();
    await this.locatorHelper.safeClick(paymentPlanMenu, 'Left Menu Payment Plan');
    await this.waitForSpinnerToDisappear();
  }

  public async clickAddPaymentPlan(): Promise<void> {
    this.logger.info('Clicking Add Payment Plan button');
    await this.locatorHelper.safeClick(this.addPaymentPlanButton, 'Add Payment Plan Button');
    await this.modalContainer.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  public async fillPlanForm(planData: Partial<TestPlanData>): Promise<void> {
    this.logger.info(`Filling plan form with data: ${JSON.stringify(planData)}`);

    if (planData.description) {
      await this.locatorHelper.safeFill(this.descriptionInput, planData.description, 'Description');
    }

    if (planData.amount !== undefined) {
      await this.locatorHelper.safeFill(this.amountInput, String(planData.amount), 'Amount');
    }

    if (planData.frequencyUnit) {
      const unit = planData.frequencyUnit.toLowerCase();
      if (unit.includes('day')) {
        await this.dailyFrequencyTab.click();
      } else if (unit.includes('week')) {
        await this.weeklyFrequencyTab.click();
      } else if (unit.includes('month')) {
        await this.monthlyFrequencyTab.click();
      }
    }

    if (planData.startDate) {
      await this.locatorHelper.safeFill(this.startDateInput, planData.startDate, 'Start Date');
    }
  }

  public async savePlan(): Promise<void> {
    this.logger.info('Clicking Save Plan');
    await this.locatorHelper.safeClick(this.saveButton, 'Save Plan Button');
    await this.waitForSpinnerToDisappear();
  }

  public async saveAndClosePlan(): Promise<void> {
    this.logger.info('Clicking Save & Close Plan');
    await this.locatorHelper.safeClick(this.saveAndCloseButton, 'Save & Close Button');
    await this.waitForSpinnerToDisappear();
  }

  /**
   * Verify list view is loaded with payment plans table
   */
  public async verifyListViewLoaded(): Promise<boolean> {
    this.logger.info('Verifying Payment Plan list view is loaded');
    await this.addPaymentPlanButton.waitFor({ state: 'visible', timeout: 15000 });
    return await this.addPaymentPlanButton.isVisible();
  }

  /**
   * Returns list of column headers from the payment plan table
   */
  public async getTableHeaders(): Promise<string[]> {
    const headers = this.page.locator('.ui-datalist-header-item-container .mtab-column-seperator span');
    await headers.first().waitFor({ state: 'visible', timeout: 10000 });
    return (await headers.allTextContents()).map(h => h.trim()).filter(Boolean);
  }

  /**
   * Returns count of plan rows in the table
   */
  public async getPlanRowsCount(): Promise<number> {
    return await this.planListRows.count();
  }

  /**
   * Verifies if specific plan status badge is present (e.g. Active or Inactive)
   */
  public async hasPlanWithStatus(status: 'Active' | 'Inactive'): Promise<boolean> {
    const badge = this.planListRows.filter({ hasText: new RegExp(`\\b${status}\\b`, 'i') });
    return (await badge.count()) > 0;
  }

  /**
   * Verifies table pagination text
   */
  public async getPaginationText(): Promise<string> {
    const paginator = this.page.locator('.ui-paginator, .pagination, [class*="paginator"], span:has-text("of")').first();
    if (await paginator.isVisible({ timeout: 5000 }).catch(() => false)) {
      return (await paginator.textContent())?.trim() || '';
    }
    return '';
  }
}
