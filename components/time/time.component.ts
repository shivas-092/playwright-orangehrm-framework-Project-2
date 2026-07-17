import { Page, expect } from '@playwright/test';

export class TimeComponent {
  constructor(private readonly page: Page) {}

  async navigateToTimeModule() {
    await this.page.getByRole('link', { name: 'Time' }).click();
    await this.waitForPageLoader();
    await expect(this.page).toHaveURL(/time/);
  }

  async navigateToCustomers() {
    await this.page.goto('/web/index.php/time/viewCustomers', { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoader();
    await expect(this.page).toHaveURL(/viewCustomers/);
    await expect(this.page.getByRole('heading', { name: 'Customers' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async navigateToProjects() {
    await this.page.goto('/web/index.php/time/viewProjects', { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoader();
    await expect(this.page).toHaveURL(/viewProjects/);
    await expect(this.page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async navigateToMyTimesheets() {
    await this.page.goto('/web/index.php/time/viewMyTimesheet', { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoader();
    await expect(this.page).toHaveURL(/viewMyTimesheet/);
    await expect(this.page.getByRole('heading', { name: 'My Timesheet' })).toBeVisible();
  }

  async waitForPageLoader() {
    const loader = this.page.locator('.oxd-loading-spinner');

    if (await loader.isVisible().catch(() => false)) {
      await loader.waitFor({ state: 'hidden' });
    }
  }
}