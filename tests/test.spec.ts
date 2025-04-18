import { test, expect } from '@playwright/test';
import goToForumPage from '../utils/goToForumPage';
import registrationClick from '../utils/registrationClick';
import iAgreeBtn from '../utils/iAgreeBtn';
import {formFields, homePage} from '../utils/constants';
import fillForm from '../utils/fillForm';

test.describe(`visit ${homePage} and and Verify Title / test TC01`, () => {
  test.describe.configure({ mode: 'serial' });
  
  test.beforeEach(async ({ page }) => {
  await page.goto(homePage, { waitUntil: 'domcontentloaded' });
  });
  
  test('page has title Veeam', async ({ page }) => {
    await expect(page).toHaveURL(homePage);
    await expect.poll(() => page.title()).toContain('Veeam');
  });

  test('should display the clickable button "Support"', async ({ page }) => {
    await goToForumPage(page);
  }); 
});

test.describe('navigation to forum and "I agree" functionality / test TC02', () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeEach(async ({ page }) => {
    await goToForumPage(page);
  });
  
  test('forum has registration link', async ({ page }) => {
    await expect(page).toHaveURL(/forum/i);
    await registrationClick(page);
  });

  test('button "I agree" functionality', async ({ page }) => {
    await expect(page).toHaveURL(/forum/i);
    await registrationClick(page);
    await iAgreeBtn(page);
  });
});

test.describe('register on forum with requested data / test TC03', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await goToForumPage(page);
    await registrationClick(page);
    await iAgreeBtn(page);
  });
  
  test('page has form and Submit button', async ({ page }) => {
    await expect(page.locator('form#register')).toBeVisible({ timeout: 10000 }); 
    const submitButton = page.locator('input[type="submit"][value="Submit"]');
    await expect(submitButton).toBeVisible({ timeout: 20000 });
    await submitButton.click();
  });

  test('fill in and submit the requested data', async ({ page }) => {
    
    await fillForm(page, formFields);

    const submitButton = page.locator('input[type="submit"][value="Submit"]');
    await expect(submitButton).toBeVisible();

    await page.screenshot({ path: `screenshots/${Date.now()}_before_submit.png` });

    const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('ucp.php?mode=register') && response.status() === 200),
    submitButton.click(),
    ]);
   
    await page.screenshot({ path: `screenshots/${Date.now()}_after_submit.png` });

    const errorMsg = page.locator('dd.error', {
      hasText: 'Public email are not allowed',
      });
      await errorMsg.waitFor({ state: 'visible' });
      await expect(errorMsg).toBeVisible({ timeout: 10000 });
    });
  
});
