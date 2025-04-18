import {  expect, Page } from '@playwright/test';

const iAgreeBtn = async (page: Page) => {
  const iAgreeBtn = page.locator('input[type="submit"][value="I agree to these terms"]');
    await expect(iAgreeBtn).toBeAttached();
    await iAgreeBtn.waitFor({ state: 'visible' });
  await expect(iAgreeBtn).toBeVisible({ timeout: 10000 });
  
  await iAgreeBtn.click();

}
 
export default iAgreeBtn;
