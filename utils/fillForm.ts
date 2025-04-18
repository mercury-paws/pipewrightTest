import { Page,expect } from '@playwright/test';

const fillForm = async (page: Page, fields: [string, string][]) => {
    for (const [id, value] of fields) {
        
        const input = page.locator(id);
        await input.waitFor({ state: 'visible', timeout: 40000 }); 
        await expect(input).toBeAttached();
        await input.fill(value);
        
        if (id === '#email') {
          const isValidEmail = await input.evaluate((el: HTMLInputElement) => el.checkValidity());
          expect(isValidEmail).toBe(true);
        }
        if (id === '#new_password' || id === '#password_confirm') {
          await expect(input).toHaveAttribute('type', 'password');
        }
    }
}

export default fillForm;