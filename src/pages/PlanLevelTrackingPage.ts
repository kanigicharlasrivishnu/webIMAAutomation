import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlanLevelTrackingPage extends BasePage {
  // Grid Locators
  public gridContainer: Locator;
  public gridRows: Locator;
  public pinnedGrandTotalRow: Locator;
  public selectionCheckboxes: Locator;
  public emptyStateMessage: Locator;

  // Filter Pane Locators
  public filterToggle: Locator;
  public filterPane: Locator;
  public overdueAmountFromInput: Locator;
  public overdueAmountToInput: Locator;
  public planStatusFilter: Locator;
  public lastPaymentStatusFilter: Locator;
  public frequencyFilter: Locator;
  public cardBrandFilter: Locator;
  public applyFiltersButton: Locator;
  public resetFiltersButton: Locator;

  // Actions
  public printButton: Locator;
  public exportButton: Locator;
  public exportFormatOptions: Locator;

  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);

    this.gridContainer = page.locator('.plan-tracking-grid, .worklist-grid, #plan-tracking-table');
    this.gridRows = page.locator('.worklist-grid tbody tr, .plan-tracking-grid tr.data-row');
    this.pinnedGrandTotalRow = page.locator('.pinned-grand-total, tfoot tr.totals-row');
    this.selectionCheckboxes = page.locator('.worklist-grid input[type="checkbox"].row-select');
    this.emptyStateMessage = page.locator('.empty-grid-message, .no-records-found');

    // Filters
    this.filterToggle = page.locator('.filter-toggle-btn, [data-toggle="filter-pane"]');
    this.filterPane = page.locator('.filter-pane, .filters-container');
    this.overdueAmountFromInput = page.locator('input[name="overdueFrom"], [data-filter="overdueFrom"]');
    this.overdueAmountToInput = page.locator('input[name="overdueTo"], [data-filter="overdueTo"]');
    this.planStatusFilter = page.locator('select[name="filterPlanStatus"], [data-filter="planStatus"]');
    this.lastPaymentStatusFilter = page.locator('select[name="filterLastPaymentStatus"], [data-filter="lastPaymentStatus"]');
    this.frequencyFilter = page.locator('select[name="filterFrequency"], [data-filter="frequency"]');
    this.cardBrandFilter = page.locator('select[name="filterCardBrand"], [data-filter="cardBrand"]');
    this.applyFiltersButton = page.getByRole('button', { name: /apply filters|apply|search/i });
    this.resetFiltersButton = page.getByRole('button', { name: /reset filters|reset/i });

    // Header Actions
    this.printButton = page.getByRole('button', { name: /print/i });
    this.exportButton = page.getByRole('button', { name: /export/i });
    this.exportFormatOptions = page.locator('.export-menu-item, [data-format]');
  }

  public async openWorklist(): Promise<void> {
    this.logger.info('Opening Plan-Level Tracking worklist');
    await this.navigateTo(`${this.page.url().split('#')[0]}#/tracking/plan-level`);
  }

  public async filterByOverdueRange(from?: number | string, to?: number | string): Promise<void> {
    this.logger.info(`Filtering tracking worklist by Overdue Amount range: [${from ?? ''} - ${to ?? ''}]`);
    if (from !== undefined) {
      await this.locatorHelper.safeFill(this.overdueAmountFromInput, String(from), 'Overdue From');
    }
    if (to !== undefined) {
      await this.locatorHelper.safeFill(this.overdueAmountToInput, String(to), 'Overdue To');
    }
    await this.locatorHelper.safeClick(this.applyFiltersButton, 'Apply Filters Button');
    await this.waitForSpinnerToDisappear();
  }

  public async resetFilters(): Promise<void> {
    this.logger.info('Resetting tracking filters');
    await this.locatorHelper.safeClick(this.resetFiltersButton, 'Reset Filters Button');
    await this.waitForSpinnerToDisappear();
  }

  public async openPaymentsDrawer(ppNo: string): Promise<void> {
    this.logger.info(`Expanding payments drawer for plan [${ppNo}]`);
    const row = this.gridRows.filter({ hasText: ppNo }).first();
    const expandBtn = row.locator('.drawer-toggle, .btn-expand, [aria-label="Expand"]');
    await expandBtn.click();
  }

  public async clickPatientName(patientName: string): Promise<void> {
    this.logger.info(`Clicking patient name [${patientName}]`);
    const cell = this.page.getByRole('cell', { name: patientName }).or(this.page.locator(`td:has-text("${patientName}")`)).first();
    await cell.click();
  }

  public async clickPlanLink(ppNo: string): Promise<void> {
    this.logger.info(`Clicking PP No link [${ppNo}]`);
    const link = this.page.getByRole('link', { name: ppNo }).or(this.page.locator(`a:has-text("${ppNo}")`)).first();
    await link.click();
  }

  public async exportAs(format: 'CSV' | 'Excel' | 'PDF'): Promise<void> {
    this.logger.info(`Exporting tracking worklist in format: ${format}`);
    await this.exportButton.click();
    await this.exportFormatOptions.filter({ hasText: new RegExp(format, 'i') }).click();
  }
}
