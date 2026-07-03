// components/admin/admin.component.ts
import { Page, expect } from '@playwright/test';
import { AdminUserData } from '../../test-data/admin.data';

export class AdminComponent {
  constructor(private readonly page: Page) {}

  async navigateToAdmin() {
  await this.page.goto('/web/index.php/admin/viewSystemUsers', {
    waitUntil: 'domcontentloaded',
  });

  await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
  await expect(
    this.page.getByRole('heading', { name: 'System Users' })
  ).toBeVisible();
}

 async searchUser(username: string) {
  await this.getUsernameInput().fill(username);

  const searchButton = this.page.getByRole('button', { name: 'Search' });

  await expect(searchButton).toBeVisible();
  await expect(searchButton).toBeEnabled();

  await searchButton.click();

  await expect(
    this.page.locator('.oxd-table').first()
  ).toBeVisible();
}

  async verifySearchResult(username: string) {
    await expect(this.getUserRow(username).first()).toBeVisible();
  }

  async verifyStatusInResult(username: string, status: string) {
    await expect(this.getUserRow(username).first()).toContainText(status);
  }

  // Add User
  async clickAddButton() {
    await this.page.getByRole('button', { name: /Add/ }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Add User' })
    ).toBeVisible();
  }

  async addUser(user: AdminUserData) {
    await this.clickAddButton();
    await this.selectUserRole(user.role);
    await this.enterEmployeeName(user.employeeName);
    await this.selectStatus(user.status);
    await this.enterUsername(user.username);
    await this.enterPassword(user.password);
    await this.enterConfirmPassword(user.confirmPassword);
    await this.saveUser();
    await this.verifySuccessMessage();
  }

  // Edit User
  async clickEditUser(username: string) {
    const row = this.getUserRow(username).first();

    await expect(row).toBeVisible();
    await row.getByRole('button').nth(1).click();

    await expect(
      this.page.getByRole('heading', { name: 'Edit User' })
    ).toBeVisible();
  }
  async deleteUser(username: string) {
  const row = this.getUserRow(username).first();

  await expect(row).toBeVisible();

  // In OrangeHRM action column, first button is Delete, second button is Edit
  await row.getByRole('button').nth(0).click();

  await this.page.getByRole('button', { name: 'Yes, Delete' }).click();

  await this.verifySuccessMessage();
}
async verifyUserDeleted(username: string) {
  await this.searchUser(username);

  await expect(this.page.locator('.oxd-table-card')).toHaveCount(0);
}
  async updateStatus(status: 'Enabled' | 'Disabled') {
    await this.selectStatus(status);
  }

  // Common Form Actions
  async selectUserRole(role: 'Admin' | 'ESS') {
    await this.page.locator('.oxd-select-text').nth(0).click();
    await this.page.getByRole('option', { name: role }).click();
  }

  async selectStatus(status: 'Enabled' | 'Disabled') {
    await this.page.locator('.oxd-select-text').nth(1).click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async enterEmployeeName(employeeName: string) {
    const employeeInput = this.page.getByPlaceholder('Type for hints...');

    await employeeInput.fill(employeeName);

    const option = this.page.getByRole('option').filter({
      hasText: employeeName,
    });

    await expect(option).toBeVisible();
    await option.click();
  }

  async enterUsername(username: string) {
    await this.getUsernameInput().fill(username);
  }

  async enterPassword(password: string) {
    await this.page
      .locator('.oxd-input-group')
      .filter({ hasText: /^Password$/ })
      .getByRole('textbox')
      .fill(password);
  }

  async enterConfirmPassword(confirmPassword: string) {
    await this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Confirm Password' })
      .getByRole('textbox')
      .fill(confirmPassword);
  }

  async saveUser() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifySuccessMessage() {
    await expect(this.page.getByText(/Successfully/)).toBeVisible();
  }

  // Private reusable locators
  private getUsernameInput() {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .getByRole('textbox');
  }

  private getUserRow(username: string) {
    return this.page.locator('.oxd-table-card').filter({ hasText: username });
  }
}