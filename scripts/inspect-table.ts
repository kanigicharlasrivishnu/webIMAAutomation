import { chromium } from '@playwright/test';
import path from 'path';

async function inspectTable() {
  const browser = await chromium.launch({ headless: true });
  const storagePath = path.resolve(process.cwd(), 'auth', 'user-state.json');
  const context = await browser.newContext({ storageState: storagePath, ignoreHTTPSErrors: true });
  const page = await context.newPage();

  console.log('Navigating to payment plan screen...');
  await page.goto('https://webims.meditab.local/#/app/patient/edit/10003171895/payment-plan', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Check table selectors
  const tableCount = await page.locator('table').count();
  console.log('Total tables found:', tableCount);

  const thCount = await page.locator('th').count();
  console.log('Total th found:', thCount);

  const headers = await page.locator('th, [role="columnheader"], .ui-column-title').allInnerTexts();
  console.log('Column headers found:', headers.filter(Boolean));

  const trCount = await page.locator('tr').count();
  console.log('Total tr found:', trCount);

  // Check PrimeNG or custom table elements
  const pTables = await page.locator('p-table, p-datatable, mtab-patient-payment-plan').count();
  console.log('PrimeNG / mtab tables:', pTables);

  const texts = await page.locator('.ui-table, .p-datatable, table').first().innerText().catch(() => 'none');
  console.log('Table preview (first 300 chars):', texts.slice(0, 300));

  await browser.close();
}

inspectTable().catch(console.error);
