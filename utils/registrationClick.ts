import {  expect, Page } from '@playwright/test';

const registrationClick = async (page: Page) => {
  let registrationLink = page.getByRole('link', { name: 'Register', exact: true });
  await registrationLink.waitFor({ state: 'visible' });
  await expect(registrationLink).toBeVisible({ timeout: 10000 });
  
  await registrationLink.click();

}

export default registrationClick;