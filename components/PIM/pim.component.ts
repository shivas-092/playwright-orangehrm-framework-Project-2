import { Page, expect } from '@playwright/test';

export class PIMComponent {
  constructor(private readonly page: Page) {}

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await expect(this.page).toHaveURL(/addEmployee/);
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async addEmployee(firstName: string, lastName: string) {
    const employeeId = Date.now().toString().slice(-6);

    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);

    await this.employeeIdInput().fill(employeeId);

    await this.page.getByRole('button', { name: 'Save' }).click();

    await expect(this.page).toHaveURL(/viewPersonalDetails/);
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

    return {
      firstName,
      lastName,
      employeeId,
    };
  }

  async navigateToEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();

    await expect(this.page).toHaveURL(/viewEmployeeList/);
  }

  async searchEmployee(employeeId: string) {
    await this.navigateToEmployeeList();

    await this.employeeIdInput().fill(employeeId);

    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyEmployeeExists(employeeId: string) {
    await expect(this.getEmployeeRow(employeeId)).toBeVisible();
  }

  async openEmployeeFromSearchResult(employeeId: string) {
    const employeeRow = this.getEmployeeRow(employeeId);

    await employeeRow.getByText(employeeId).click();

    await expect(this.page).toHaveURL(/viewPersonalDetails/);
    await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  }

  async selectGender(gender: 'Male' | 'Female') {
    await this.page.locator(`//label[normalize-space()='${gender}']`).click();

    await this.page
      .locator('form')
      .first()
      .getByRole('button', { name: 'Save' })
      .click();
  }

  async deleteEmployee(employeeId: string) {
    const employeeRow = this.getEmployeeRow(employeeId);

    await employeeRow.getByRole('button').nth(1).click();

    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();

    await expect(this.page.getByText('Successfully Deleted')).toBeVisible();
  }

  async verifyEmployeeDeleted(employeeId: string) {
    await this.searchEmployee(employeeId);

    await expect(this.page.locator('.oxd-table-card')).toHaveCount(0);
  }

  private employeeIdInput() {
    return this.page.locator(
      '//label[text()="Employee Id"]/../following-sibling::div//input'
    );
  }

  private getEmployeeRow(employeeId: string) {
    return this.page.locator('.oxd-table-card').filter({ hasText: employeeId });
  }
}