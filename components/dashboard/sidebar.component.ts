import { Page, expect } from '@playwright/test';

export class SidebarComponent {
  constructor(private readonly page: Page) {}

  async verifySidebarVisible() {
    await expect(
      this.page.getByRole('navigation', { name: 'Sidepanel' })
    ).toBeVisible();
  }

  async navigateToDashboard() {
    await this.page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded',
    });

    await expect(
      this.page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  }

  async navigateToPIM() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.page).toHaveURL(/viewEmployeeList/);
  }

  async navigateToAdmin() {
    await this.page.goto('/web/index.php/admin/viewSystemUsers', {
      waitUntil: 'domcontentloaded',
    });

    await expect(
      this.page.getByRole('heading', { name: 'System Users' })
    ).toBeVisible();
  }
}