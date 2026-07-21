import { expect, Locator, Page } from '@playwright/test';

export class FormUtil {
  static async fill(input: Locator, value: string) {
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();

    for (let attempt = 1; attempt <= 3; attempt++) {
      await input.scrollIntoViewIfNeeded();
      await input.click();
      await input.fill(value);

      if ((await input.inputValue()) === value) {
        await expect(input).toHaveValue(value);
        return;
      }
    }

    await expect(input).toHaveValue(value);
  }

  static async selectDropdownByText(page: Page, dropdown: Locator, option: string) {
    await this.waitForLoader(page);
    await dropdown.scrollIntoViewIfNeeded();
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toBeEnabled();

    try {
      await dropdown.click({ timeout: 10000 });
    } catch {
      await dropdown.click({ force: true, timeout: 10000 });
    }

    const dropdownMenu = page.locator('.oxd-select-dropdown:visible');
    const dropdownOption = dropdownMenu.getByRole('option', { name: option, exact: true });

    await expect(dropdownMenu).toBeVisible();
    await expect(dropdownOption).toBeVisible();
    await dropdownOption.click();
    await expect(dropdown).toContainText(option);
  }

  static async verifyUpdatedToast(page: Page) {
    const toast = page.locator('.oxd-toast');
    await expect(toast).toContainText(/Successfully Updated|Successfully Saved/i, { timeout: 15000 });
}

  static async verifySavedToast(page: Page) {
    const toast = page.locator('.oxd-toast').filter({ hasText: 'Successfully Saved' });
    await expect(toast).toBeVisible();
  }

  static async waitForLoader(page: Page) {
    const loader = page.locator('.oxd-loading-spinner');
    await loader.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }
}