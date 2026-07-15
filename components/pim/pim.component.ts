import { Page, expect, Locator } from '@playwright/test';
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
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async addEmployee(employee: EmployeeDetails) {
    const employeeId = Date.now().toString().slice(-6);

    await this.waitForFormLoader();
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastName);
    await this.employeeIdInput().fill(employeeId);

    if (employee.createLogin === true) {
      await this.enableLoginDetails();
      await this.waitForFormLoader();
      await this.usernameInput().fill(employee.username!);
      await this.passwordInput().fill(employee.password!);
      await this.confirmPasswordInput().fill(employee.password!);
    }

    await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 30000 });
    await this.waitForFormLoader();
    await expect(this.page.getByRole('textbox', { name: 'First Name' })).toBeVisible({ timeout: 20000 });

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
    await this.page.goto('/web/index.php/pim/viewEmployeeList', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/viewEmployeeList/);
    await this.waitForFormLoader();
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  }

  async searchEmployee(employeeId: string) {
    await this.navigateToEmployeeList();
    await this.employeeIdInput().fill(employeeId);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForFormLoader();
    await expect(this.getEmployeeRow(employeeId)).toBeVisible({ timeout: 20000 });
  }

  async verifyEmployeeExists(employeeId: string) {
    await expect(this.getEmployeeRow(employeeId)).toBeVisible();
  }

  async openEmployeeFromSearchResult(employeeId: string) {
    const employeeRow = this.getEmployeeRow(employeeId);

    await expect(employeeRow).toBeVisible();
    await employeeRow.getByText(employeeId, { exact: true }).click();
    await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 30000 });
    await this.waitForFormLoader();
    await expect(this.page.getByRole('textbox', { name: 'First Name' })).toBeVisible({ timeout: 20000 });
  }

  async selectGender(gender: 'Male' | 'Female') {
    await this.waitForFormLoader();
    await this.page.locator(`//label[normalize-space()='${gender}']`).click();
    await this.page.locator('form').first().getByRole('button', { name: 'Save' }).click();
    await this.waitForFormLoader();
  }

  async deleteEmployee(employeeId: string) {
    const employeeRow = this.getEmployeeRow(employeeId);

    await expect(employeeRow).toBeVisible();
    await employeeRow.getByRole('button').nth(1).click();
    await expect(this.page.getByText('Are you Sure?', { exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Successfully Deleted', { exact: false })).toBeVisible();
    await this.waitForFormLoader();
  }

  async verifyEmployeeDeleted(employeeId: string) {
    await this.navigateToEmployeeList();
    await this.employeeIdInput().fill(employeeId);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitForFormLoader();
    await expect(this.getEmployeeRow(employeeId)).toHaveCount(0);
  }

  private async enableLoginDetails() {
    await this.page.locator('.oxd-switch-input').click();
    await expect(this.usernameInput()).toBeVisible();
  }

  private async waitForFormLoader() {
    const loader = this.page.locator('.oxd-form-loader');

    if (await loader.count()) {
      await loader.waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    }
  }

  private employeeIdInput(): Locator {
    return this.page.locator('//label[text()="Employee Id"]/../following-sibling::div//input');
  }

  private usernameInput(): Locator {
    return this.page.locator('//label[text()="Username"]/../following-sibling::div//input');
  }

  private passwordInput(): Locator {
    return this.page.locator('//label[text()="Password"]/../following-sibling::div//input').first();
  }

  private confirmPasswordInput(): Locator {
    return this.page.locator('//label[text()="Confirm Password"]/../following-sibling::div//input');
  }

  private getEmployeeRow(employeeId: string): Locator {
    return this.page.locator('.oxd-table-card').filter({ hasText: employeeId });
  }
}