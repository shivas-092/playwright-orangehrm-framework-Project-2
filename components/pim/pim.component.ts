import { Page, expect } from '@playwright/test';
import { JsonUtil } from '../../utils/json.util';

type EmployeeDetails = {
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  createLogin?: boolean;
};

export class PIMComponent {
  constructor(private readonly page: Page) {}

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await expect(this.page).toHaveURL(/addEmployee/);
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async addEmployee(employee: EmployeeDetails) {
    const employeeId = Date.now().toString().slice(-6);

    await this.page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastName);
    await this.employeeIdInput().fill(employeeId);

    if (employee.createLogin) {
      await this.enableLoginDetails();

      await this.usernameInput().fill(employee.username!);
      await this.passwordInput().fill(employee.password!);
      await this.confirmPasswordInput().fill(employee.password!);
    }

    await this.page.getByRole('button', { name: 'Save' }).click();
await expect(this.page.getByText('Successfully Saved')).toBeVisible();

    const employeeDetails = {
  firstName: employee.firstName,
  lastName: employee.lastName,
  employeeId,
  username: employee.username,
  password: employee.password,
};

JsonUtil.writeJson('test-data/employee.json', employeeDetails);

return employeeDetails;
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

  private async enableLoginDetails() {
    await this.page.locator('.oxd-switch-input').click();
  }

  private employeeIdInput() {
    return this.page.locator(
      '//label[text()="Employee Id"]/../following-sibling::div//input'
    );
  }

  private usernameInput() {
    return this.page.locator(
      '//label[text()="Username"]/../following-sibling::div//input'
    );
  }

  private passwordInput() {
    return this.page.locator(
      '//label[text()="Password"]/../following-sibling::div//input'
    ).first();
  }

  private confirmPasswordInput() {
    return this.page.locator(
      '//label[text()="Confirm Password"]/../following-sibling::div//input'
    );
  }

  private getEmployeeRow(employeeId: string) {
    return this.page.locator('.oxd-table-card').filter({ hasText: employeeId });
  }
}