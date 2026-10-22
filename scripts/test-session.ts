import { chromium } from '@playwright/test';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const storagePath = path.resolve(process.cwd(), 'auth', 'user-state.json');
  console.log('Testing storage state at:', storagePath);
  const context = await browser.newContext({ storageState: storagePath, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  await page.goto('https://webims.meditab.local/#/app/patient/edit/10003171895/payment-plan');
  await page.waitForTimeout(5000);
  
  console.log('Current URL:', page.url());
  const isLogin = await page.locator('#clinic').isVisible().catch(() => false);
  console.log('Is login visible:', isLogin);
  const isPayPlan = await page.locator('button:has-text("Add Payment Plan")').isVisible().catch(() => false);
  console.log('Is Add Payment Plan button visible:', isPayPlan);
  
  await browser.close();
}

main().catch(console.error);
