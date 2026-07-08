import { Page, expect } from '@playwright/test';
import { env } from '../../config/env';

export class LoginComponent {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();

    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();

    await expect(this.page).toHaveURL(/dashboard/);
  }

  async loginAsAdmin() {
    await this.login(env.username, env.password);
  }

  async logout() {
    await this.page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded',
    });

    const userDropdown = this.page.locator('.oxd-userdropdown-tab');

    await expect(userDropdown).toBeVisible();
    await userDropdown.click();

    await this.page.getByRole('menuitem', { name: 'Logout' }).click();

    await expect(this.page).toHaveURL(/login/);
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/login/);
  }
}