import { test, expect } from '@playwright/test';
import goToForumPage from '../utils/goToForumPage';
import registrationClick from '../utils/registrationClick';
import iAgreeBtn from '../utils/iAgreeBtn';
import formFields from '../utils/constants';

test.describe('main page https://www.veeam.com/ functionality', () => {

  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.veeam.com/', { waitUntil: 'domcontentloaded' });
  
});
  
  test('page has title Veeam', async ({ page }) => {
    await expect(page).toHaveURL('https://www.veeam.com/');
    await expect.poll(() => page.title()).toContain('Veeam');
  });

  test('should display the clickable button "Support"', async ({ page }) => {
    await goToForumPage(page);
  });
  
});

test.describe('forum page and "I agree" functionality', () => {

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

test.describe('registration form functionality', () => {

test.beforeEach(async ({ page }) => {
  await goToForumPage(page);
  await registrationClick(page);
  await iAgreeBtn(page)
});
  
  test('page has form', async ({ page }) => {
    await expect(page.locator('form#register')).toBeVisible({ timeout: 10000 });
  });

  test('page has submitButton', async ({ page }) => {
    const submitButton = page.locator('input[type="submit"][value="Submit"]');
    await expect(submitButton).toBeVisible({ timeout: 10000 });
    await submitButton.click();
  });


  // formFields.forEach(([id, value]) => {
  //   test(`field ${id} should be visible and accept value`, async ({ page }) => {
  //     const input = page.locator(id);
  //     await input.waitFor({ state: 'visible', timeout: 60000 });
  //     await expect(input).toBeAttached();
  //     await expect(input).toBeVisible();
  //     await input.fill(value);

  //     if (id === '#email') {
  //       const isValidEmail = await input.evaluate((el: HTMLInputElement) => el.checkValidity());
  //       expect(isValidEmail).toBe(true);
  //     }
      
  //     await expect(input).toHaveValue(value);
  // check for the pass to be in dots???
  //   });
  // });

  

  test('fill in and submit the requested info', async ({ page }) => {

    await expect(page.locator('form#register')).toBeVisible({ timeout: 10000 });
    
    for (const [id, value] of formFields) {
        await page.fill(id, value);
    }

    const submitButton = page.locator('input[type="submit"][value="Submit"]');
    await expect(submitButton).toBeVisible();

    await page.screenshot({ path: 'before_submit.png' });

    const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('ucp.php?mode=register') && response.status() === 200),
    submitButton.click(),
  ]);
   
 
  await page.screenshot({ path: 'after_submit.png' });

  //page is reloaded <dl><dd class="error">Public email are not allowed.</dd></dl>
    const errorMsg = page.locator('dd.error', {
      hasText: 'Public email are not allowed',
      });
      await errorMsg.waitFor({ state: 'visible' });
      await expect(errorMsg).toBeVisible({ timeout: 10000 });
    });
  
});
