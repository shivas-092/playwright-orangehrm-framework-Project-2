import { Page, expect } from '@playwright/test';

export class SidebarComponent {
  constructor(private readonly page: Page) {}

  async verifySidebarVisible() {
    await expect (this.page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
  }

  async navigateToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await expect(this.page).toHaveURL(/viewEmployeeList/);
  }
}