import {  expect, Page } from '@playwright/test';

const goToForumPage = async (page: Page) => {
  await page.goto('https://www.veeam.com/', { waitUntil: 'domcontentloaded' });
  const supportButton = page.locator('button', { hasText: /support/i });
  await supportButton.waitFor({ state: 'visible' });
  await expect(supportButton).toBeVisible();
  await supportButton.hover();
  await supportButton.click();

  const forumLink = page.locator('a', { hasText: /forum/i });
  await forumLink.waitFor({ state: 'visible' });
  await expect(forumLink).toBeVisible({ timeout: 10000 });
  await forumLink.click();
  await expect(page).toHaveURL(/forum/i);
}

export default goToForumPage;