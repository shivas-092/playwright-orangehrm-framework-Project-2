import { Page, expect } from '@playwright/test';

export class DashboardComponent {
  constructor(private readonly page: Page) {}

  async verifyDashboardPage() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async verifyDashboardWidgets() {
    await expect(this.page.getByText('Time at Work')).toBeVisible();
    await expect(this.page.getByText('My Actions')).toBeVisible();
    await expect(this.page.getByText('Quick Launch')).toBeVisible();
  }
}