import { chromium } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { env } from '../src/config/environment';
import path from 'path';

async function loginAndSave() {
  const browser = await chromium.launch({ headless: true });
  const storagePath = path.resolve(process.cwd(), 'auth', 'user-state.json');
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  console.log('Navigating to login page:', env.BASE_URL);
  const loginPage = new LoginPage(page, 'LOGIN-REFRESH');
  await page.goto(env.BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Current URL before login:', page.url());
  console.log(`Logging in with clinic: ${env.CLINIC}, user: ${env.USERNAME}`);

  await loginPage.login(env.CLINIC, env.USERNAME, env.PASSWORD);
  await page.waitForTimeout(5000);

  console.log('Current URL after login:', page.url());
  const isStillLogin = await page.locator('#clinic').isVisible().catch(() => false);
  console.log('Is still on login page:', isStillLogin);

  if (!isStillLogin) {
    await page.context().storageState({ path: storagePath });
    console.log('Successfully saved fresh storage state to:', storagePath);
  } else {
    console.log('Login failed or pending 2FA/approval.');
  }

  await browser.close();
}

loginAndSave().catch(console.error);
